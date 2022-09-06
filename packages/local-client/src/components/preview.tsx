import './preview.css';
import {useEffect, useRef} from 'react';

interface PreviewProps {
    code: string;
    err: string;
}

const html = `
        <html >
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                const handleError = (err) => {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
                    console.error(err);
                }
                window.addEventListener('error', (event) => {
                    handleError(event.error);
                    event.preventDefault();
                })
                window.addEventListener('message', (event) => {
                    try{
                        eval(event.data);
                    } catch(err){
                        handleError(err);
                    }
                }, false);
            </script>
        </body>
        </html>
    `;

const Preview: React.FC<PreviewProps> = ({code, err}) => {
    const iframe = useRef<any>();

    useEffect(() => {
        //refresh der html-struktur vor jeder Ausführung
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code, err]);

    return (
        <div className='preview-wrapper'>
            <iframe
                title='code preview'
                ref={iframe}
                srcDoc={html}
                sandbox='allow-scripts'
            />
            {err && <div className='preview-error'>{err}</div>}
        </div>
    );
};

export default Preview;
