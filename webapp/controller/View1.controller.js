sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        _sPrevProduct: null,
        onInit() {
            this._sPrevRFQ = null;

            const oModel = new JSONModel();
            oModel.loadData(sap.ui.require.toUrl("project1/model/productdetails.json"));
            this.getView().setModel(oModel);
        },

        formatMergeCell: function(sValue) {
            if (sValue === this._sPrevProduct) {
                return "\u200B"; 
            }
            this._sPrevProduct = sValue;
            return sValue;
        }
    });
});
