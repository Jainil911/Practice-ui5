sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox,) {
    "use strict";

    return Controller.extend("project1.controller.View5", {

        onInit: function () {
            var oFilterBar = this.byId("filterbar");
            oFilterBar.addEventDelegate({
                onAfterRendering: function () {
                    var oDomRef = oFilterBar.getDomRef();
                    if (!oDomRef) {
                        return;
                    }
                    var aButtonEls = oDomRef.querySelectorAll(".sapMBtn");
                    aButtonEls.forEach(function (oButtonEl) {
                        var sText = oButtonEl.textContent.trim();
                        var oButton = sap.ui.getCore().byId(oButtonEl.id);
                        if (sText === "Go") {
                            // The DOM element's id maps back to the UI5 control instance
                            oButton.setText("Simulate");
                        } else if (sText === "Clear") {
                            oButton.setType("Emphasized");
                        } else if (sText === "Adapt Filters") {
                            oButton.setType("Emphasized");
                        }
                    });
                }
            });
        },

        onAfterRendering: function () {
            window.oFB = this.byId("filterbar");

        },

        onSimulate: function () {
            var oTable = this.byId("productTable");
            var sCount = this.byId("itemCount").getValue().trim();

            // Validate Count
            if (!sCount || !/^\d+$/.test(sCount) || Number(sCount) <= 0) {
                sap.m.MessageToast.show("Please enter a valid positive integer.");
                return;
            }

            var iCount = Number(sCount);
            if (!Number.isSafeInteger(iCount)) {
                sap.m.MessageToast.show("Please enter a valid integer.");
                return;
            }

            // Rebind the table to the OData model with a row cap
            oTable.unbindRows();
            oTable.bindRows({
                path: "/Products",
                length: iCount,
                threshold: iCount,
                events: {
                    dataReceived: function (oEvent) {
                        var oBinding = oEvent.getSource();
                        var iAvailable = Math.min(oBinding.getLength(), iCount);

                        sap.m.MessageToast.show(
                            iAvailable < iCount
                                ? "Requested " + iCount + " records, but only " + iAvailable + " records are available."
                                : iAvailable + " records loaded successfully."
                        );
                    }
                }
            });
        },

        onPress:function(){
            var clear = this.getView().byId("productTable")
            clear.unbindRows()
        }
    });
});
