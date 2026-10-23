sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.View2", {
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
            this.oModel = this.getView().getModel("soModel");
        },

       onSave: function () {
            var oOrder = {
                customerID: this.oModel.getProperty("/customerID"),
                customer: this.oModel.getProperty("/customer"),
                salesOrg: this.oModel.getProperty("/salesOrg"),
                distrChannel: this.oModel.getProperty("/distrChannel"),
                docDate: this.oModel.getProperty("/docDate"),
                deliveryDate: this.oModel.getProperty("/deliveryDate"),
                material: this.oModel.getProperty("/material"),
                description: this.oModel.getProperty("/description"),
                quantity: this.oModel.getProperty("/quantity"),
                netPrice: this.oModel.getProperty("/netPrice"),
                deliveryAddress: this.oModel.getProperty("/deliveryAddress")
            };

            var aSalesOrders = this.oModel.getProperty("/salesOrders") || [];
            aSalesOrders.push(oOrder);
            this.oModel.setProperty("/salesOrders", aSalesOrders);

            var aRecentOrders = this.oModel.getProperty("/recentOrders") || [];
            aRecentOrders.unshift(oOrder);
            this.oModel.setProperty("/recentOrders", aRecentOrders);

            MessageToast.show("Sales Order Saved Successfully");
            this.onClear();
        },

        onClear: function () {
            this.oModel.setProperty("/customerID", "");
            this.oModel.setProperty("/customer", "");
            this.oModel.setProperty("/salesOrg", "");
            this.oModel.setProperty("/distrChannel", "");
            this.oModel.setProperty("/docDate", "");
            this.oModel.setProperty("/deliveryDate", "");
            this.oModel.setProperty("/material", "");
            this.oModel.setProperty("/description", "");
            this.oModel.setProperty("/quantity", "");
            this.oModel.setProperty("/netPrice", "");
            this.oModel.setProperty("/deliveryAddress", "");
        }
    });
});
