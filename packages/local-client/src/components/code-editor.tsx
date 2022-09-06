import './code-editor.css';
import {useRef} from 'react';
import MonacoEditor, {OnMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        });

        editor.getModel()?.updateOptions({tabSize: 2});
    };

    /*     const monacoJSXHighlighter = new MonacoJSXHighlighter(
        MonacoEditor,
        parse,
        traverse,
        CodeEditor,
    );

    monacoJSXHighlighter.highlightOnDidChangeModelContent(); */

    const onFormatClick = () => {
        //Code vom Editor holen
        const unformatted = editorRef.current.getModel().getValue();
        //formatieren
        const formatted = prettier
            .format(unformatted, {
                parser: 'babel',
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, '');
        //formatierten Code in Editor setzen
        editorRef.current.setValue(formatted);
    };

    return (
        <div className='editor-wrapper'>
            <button
                className='button button-format is-primary is-small'
                onClick={onFormatClick}
            >
                Format
            </button>
            <MonacoEditor
                onMount={onEditorDidMount}
                value={initialValue}
                language='javascript'
                theme='vs-dark'
                height='100%'
                options={{
                    wordWrap: 'on',
                    minimap: {enabled: false},
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
