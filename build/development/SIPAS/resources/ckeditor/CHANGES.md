html {
    background-color: #bbb;
}

body.document-editor {
    width: 16.8cm; min-height: 23.76cm; /*80% a4*/
    padding: 2cm;
    margin: .5cm auto;
    border: 1px #D3D3D3 solid;
    background: white;
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
}

body.document-editor, body.document-editor td, body.document-editor th {
    font-size: 0.8em; /* 80% */
}

body.document-editor table {
    margin-top:0.5cm;
    margin-bottom:0.5cm;
}

body.document-editor .cke_editable {
    line-height: normal;
}

body.document-editor h1 {
    margin-bottom:1cm;
}

@media print {
    body.document-editor {
        border-width: 0px;
        box-shadow: none;
    }

    .cke_show_borders table.cke_show_border, 
    .cke_show_borders table.cke_show_border > tr > td, .cke_show_borders table.cke_show_border > tr > th, 
    .cke_show_borders table.cke_show_border > tbody > tr > td, .cke_show_borders table.cke_show_border > tbody > tr > th, 
    .cke_show_borders table.cke_show_border > thead > tr > td, .cke_show_borders table.cke_show_border > thead > tr > th, 
    .cke_show_borders table.cke_show_border > tfoot > tr > td, .cke_show_borders table.cke_show_border > tfoot > tr > th {
        border-width: 0px !important;
    }

    .cke_pagebreak {
    visibility: hidden;
    page-break-after: always;
    }
}

/* paper size*/
body.document-editor.a4
{
    width: 21cm; min-height: 29.7cm;
}
body.document-editor.a4, body.document-editor.a4 td, body.document-editor.a4 th {
    font-size: 1em;
}
body.document-editor.a4-80
{
    width: 16.8cm; min-height: 23.76cm;
}
body.document-editor.a4-80, body.document-editor.a4-80 td, body.document-editor.a4-80 th {
    font-size: .8em;
}

/* paper margin */
body.document-editor.margin-normal
{
    padding: 2.54cm 2.54cm 2.54cm 2.54cm;
}
body.document-editor.margin-narrow
{
    padding: 1.27cm 1.27cm 1.27cm 1.27cm;
}
body.document-editor.margin-moderate
{
    padding: 2.54cm 1.901cm 2.54cm 1.901cm;
}
body.document-editor.margin-wide
{
    padding: 2.54cm 5.08cm 2.54cm 5.08cm;
}