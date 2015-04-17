(function (Handsontable) {

    (function (Handsontable) {

        var KVSelectEditor = Handsontable.editors.SelectEditor.prototype.extend();

        KVSelectEditor.prototype.prepare = function (row, col, prop, td, originalValue, cellProperties) {

            Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);

            this.options = {};
            this.keyParamName = cellProperties.keyParamName;
            this.valueParamName = cellProperties.valueParamName;
            this.source = cellProperties.source;

            Handsontable.Dom.empty(this.select);

            for (var option in this.source) {
                if (this.source.hasOwnProperty(option)) {
                    var item = this.source[option];

                    var optionElement = document.createElement('OPTION');
                    optionElement.value = item[this.keyParamName];
                    Handsontable.Dom.fastInnerHTML(optionElement, item[this.valueParamName]);
                    this.select.appendChild(optionElement);
                }
            }
        }

        Handsontable.editors.KVSelectEditor = KVSelectEditor;
        Handsontable.editors.registerEditor("kvselect", KVSelectEditor);
    })(Handsontable);

    Handsontable.renderers.KVSelectRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        for (var key in cellProperties.source) {
            if (cellProperties.source.hasOwnProperty(key)) {
                var item = cellProperties.source[key];
                if (item[cellProperties.keyParamName] == value) {
                    var renderedValue = item[cellProperties.valueParamName];
                    Handsontable.Dom.fastInnerHTML(td, renderedValue);
                    return;
                }
            }
        }

        Handsontable.Dom.empty(td);
    };

    Handsontable.KVSelectCell = {
        editor: Handsontable.editors.KVSelectEditor,
        renderer: Handsontable.renderers.KVSelectRenderer
    }

    Handsontable.cellTypes.kvselect = Handsontable.KVSelectCell;

})(Handsontable);