sap.ui.define([
"sap/ui/core/mvc/Controller",
"sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.View4", {

        onInit: function () {
        var oModel = this.getOwnerComponent().getModel();
        oModel.read("/Products", { 
            success: function (oData) {
                console.log("Products data loaded successfully:", oData.results);
            },
            error: function (oError) {
                oError("Failed to load Products data:", oError);
            }
        });
            var oSmartTable = this.byId("idSmartTable");

            oSmartTable.attachInitialise(function () {
                var oTable = oSmartTable.getTable();

                oTable.getColumns().forEach(function (oColumn) {
                    var sHeader = oColumn.getHeader().getText();

                    switch (sHeader) {
                        case "SupplierID":
                        case "CategoryID":
                        case "Discontinued":
                            oColumn.setImportance(sap.ui.core.Priority.Low);
                            break;

                        case "UnitPrice":
                            oColumn.setImportance(sap.ui.core.Priority.Medium);
                            break;

                        default:
                            oColumn.setImportance(sap.ui.core.Priority.High);
                    }
                });
                oTable.getColumns().forEach(function (oColumn) {
                console.log(
                    oColumn.getHeader().getText(),
                    oColumn.getImportance()
                );
            });
            });
            
            this.onAfterRendering();
            var oModel = this.getOwnerComponent().getModel();

            if (!oModel) {
                MessageBox.error("OData model is not available.");
                return;
            }

            oModel.metadataLoaded()
                .then(function () {
                    console.log("Northwind metadata loaded successfully.");
                })
                .catch(function () {
                    MessageBox.error("Failed to load OData metadata.");
                });

            // Handle request failures
            oModel.attachRequestFailed(function (oEvent) {
                var oResponse = oEvent.getParameter("response");

                MessageBox.error(
                    "OData Request Failed\n" +
                    "Status: " + (oResponse?.statusCode || "Unknown") +
                    "\nMessage: " + (oResponse?.message || "No details available")
                );
            });
        },

        onAfterRendering: function () {
            var oTable = this.byId("idSmartTable").getTable();

            oTable.getColumns().forEach(function (oColumn) {
                var sText = oColumn.getHeader().getText();
                var sImportance = oColumn.getImportance();

                console.log("Column:", sText, "Importance:", sImportance);
            });
        },

        onBeforeExport: function (oEvent) {
            var oExportSettings = oEvent.getParameter("exportSettings");

            oExportSettings.fileName =
                "Products_" + new Date().toISOString().split("T")[0];
        }
    });
});
