/*
 * File: app/view/Sipas/arsip/Dataview.js
 *
 * This file was generated by Sencha Architect version 3.5.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SIPAS.view.Sipas.arsip.Dataview', {
    extend: 'Ext.view.View',
    alias: 'widget.sipas_arsip_dataview',

    requires: [
        'Ext.XTemplate'
    ],

    cls: 'sipas_archive',
    padding: 2,
    overflowY: 'auto',
    emptyText: '<div class="x-grid-empty">Tidak ada berkas</div>',
    itemSelector: 'div.image-wrap',
    overItemCls: 'x-item-over',
    trackOver: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tpl: Ext.create('Ext.XTemplate', 
                '<tpl for=".">',
                '<div class="image-wrap" id="{dokumen_id:stripTags}" {[this.createTooltip(values.dokumen_nama)]}>',
                '    <div class="image-container">',
                '        <tpl if="dokumen_progress == 1">',
                '            <span class="loading loading-medium"></span>',
                '        <tpl elseif="dokumen_progress == 2">',
                '            <span class="image {imageCls}" style="background-image: url({[this.findPreview(values)]});"></span>',
                '        <tpl elseif="dokumen_progress == 3">',
                '            <span class="tango-32 software-update-urgent"></span>',
                '        <tpl else>',
                '            <tpl if="!dokumen_preview">',
                '                <span class="image {imageCls}" style="background-image: url({[this.findPreview(values)]});"></span>',
                '            <tpl else>',
                '                <span class="image {imageCls}" style="background-image: url({[this.findPreview(values)]}); max-width: 100%;"></span>',
                '            </tpl>',
                '        </tpl>',
                '    </div>',
                '    <div class="x-editable image-title">',
                '        <span>{[this.createTitle(values.dokumen_nama)]}</span>',
                '        <span class="desc">',
                '        {[this.formatDate(values.properti_buat_tgl)]}, {[this.formatSize(values.dokumen_size)]}',
                '        </span>',
                '        {[this.formatReupload(values.dokumen_reupload)]}',
                '        {[this.formatArahan(values.dokumen_islihat)]}',
                '    </div>',
                '</div>',
                '</tpl>',
                '<div class="x-clear"></div>',
                {
                    createTitle: function(value) {
                        return Ext.String.ellipsis(value, 20, true);
                    },
                    createTooltip: function(value) {
                        return 'data-qtip="'+value+'"';
                    },
                    formatDate: function(value) {
                        return Ext.util.Format.date(value, 'd M Y H:i');
                    },
                    formatSize: function(value) {
                        return Ext.util.Format.round(value, 0)+'kB';
                    },
                    formatExtension: function(value) {
                        return Ext.String.ellipsis(value, 20, true);
                    },
                    findPreview: function(value) {
                        var loc = window.location.href,
                            mime = value.dokumen_mime;

                        return loc+'server.php/sipas/dokumen/preview?id='+value.dokumen_id;
                        // if(value.dokumen_preview === null){
                        //     return loc+'server/assets/surat_default/ext'+mime+'.png';
                        // }
                        // else{
                        //     return loc+'server/data/surat/'+value.dokumen_arsip+'/'+value.dokumen_preview+'';
                        // }
                    },
                    formatReupload: function(value) {
                        if(value === 1){
                            return '<div class="desc grey-400-i">Reupload</div>';
                        }
                    },
                    formatArahan: function(islihat) {
                        if(islihat === true){
                            return '<div class="desc grey-400-i">Bukti Arahan</div>';
                        }
                    }
                }
            )
        });

        me.callParent(arguments);
    }

});