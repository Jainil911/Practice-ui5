sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.View3", {

        onInit: function () {
            var oModel = new JSONModel({
                customerID: "",
                customer: "",
                salesOrg: "",
                distrChannel: "",
                docDate: "",
                deliveryDate: "",
                material: "",
                description: "",
                quantity: "",
                netPrice: "",
                deliveryAddress: "",

                salesOrders: [],
                recentOrders: []
            });
            this.getView().setModel(oModel, "soModel");
        },

       onSave: function () {
            var oModel = this.getView().getModel("soModel");

            var oOrder = {
                customerID: oModel.getProperty("/customerID"),
                customer: oModel.getProperty("/customer"),
                salesOrg: oModel.getProperty("/salesOrg"),
                distrChannel: oModel.getProperty("/distrChannel"),
                docDate: oModel.getProperty("/docDate"),
                deliveryDate: oModel.getProperty("/deliveryDate"),
                material: oModel.getProperty("/material"),
                description: oModel.getProperty("/description"),
                quantity: oModel.getProperty("/quantity"),
                netPrice: oModel.getProperty("/netPrice"),
                deliveryAddress: oModel.getProperty("/deliveryAddress")
            };

            var aSalesOrders = oModel.getProperty("/salesOrders") || [];
            aSalesOrders.push(oOrder);
            oModel.setProperty("/salesOrders", aSalesOrders);

            var aRecentOrders = oModel.getProperty("/recentOrders") || [];
            aRecentOrders.unshift(oOrder);
            oModel.setProperty("/recentOrders", aRecentOrders);
            MessageToast.show("Sales Order Saved Successfully");
            this.onClear();
        },

        onClear: function () {
            var oModel = this.getView().getModel("soModel");
            oModel.setProperty("/customerID", "");
            oModel.setProperty("/customer", "");
            oModel.setProperty("/salesOrg", "");
            oModel.setProperty("/distrChannel", "");
            oModel.setProperty("/docDate", "");
            oModel.setProperty("/deliveryDate", "");
            oModel.setProperty("/material", "");
            oModel.setProperty("/description", "");
            oModel.setProperty("/quantity", "");
            oModel.setProperty("/netPrice", "");
            oModel.setProperty("/deliveryAddress", "");
        }
    });
});
