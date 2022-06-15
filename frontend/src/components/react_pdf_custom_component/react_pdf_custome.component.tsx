import React, { useEffect, useMemo, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { IDocument } from "../../lib";
import { prefixer } from "../../services/urls";

export interface IReactPdfCustomProps {
    default_props?: boolean;
    // pdfFile: string;
    pdfDoc: IDocument;
}

export const ReactPdfCustomComponent: React.FC<IReactPdfCustomProps> = ({
    pdfDoc,
}) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        console.log("react pdf custom called");
    }, [onDocumentLoadSuccess]);

    const displayPdf = pdfDoc.sign;
    const filePdf = useMemo(() => ({ displayPdf }), [prefixer + displayPdf]);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file={{ utl: `${filePdf}` }}
                onLoadSuccess={onDocumentLoadSuccess}
                noData="PDF Returned Empty"
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {prefixer + pdfDoc.path}
            </p>
        </div>
    );
};
