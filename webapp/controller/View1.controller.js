sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
	"sap/ui/model/FilterOperator",
], function (Controller, Filter, FilterOperator, Sorter, StringFilterOperator) {
	"use strict";
	/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

	return Controller.extend("xtext.xtext.controller.View1", {
		onInit: function () {
			var sUrl = "/iot/iot/iot.xsodata/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, {
				useBatch: false
			});
			this.getView().setModel(oModel);
			var oList = this.byId("Table");
			this._oList = oList;
		},
		onRefresh: function (oEvent) {
			this._oList.getBinding("items").refresh();
		},
		/**
		 *@memberOf xtext.xtext.controller.View1
		 */
		OnAdd: function (oEvent) {
			// Get the number of OrgUnits in the EntitySet OrgUnits
			var count = this.getView().byId("table").getItems().length;
			// Calculate the new OrgUnit ID 
			var NewOrgUnitID = count + 1;
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Добавьте новое ВСП",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Label({
									text: "ID ВСП"
								}),
								new sap.m.Label({
									text: "Название ВСП:"
								}),
								new sap.m.Label({
									text: "Адрес ВСП:"
								}),
								new sap.m.Label({
									text: "Вода макс ВСП:"
								}),
								new sap.m.Label({
									text: "Вода мин ВСП:"
								})
							]
						}),
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Input("VSP_ID", {
									value: NewOrgUnitID,
									editable: false
								}),
								new sap.m.Input("VSP_NAME"),
								new sap.m.Input("VSP_ADDRESS"),
								new sap.m.Input("VSP_WATER_CAPACITY"),
								new sap.m.Input("VSP_WATER_MIN"),
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function () {
						// Read the Values from the PopUp
						var vsp_ID = sap.ui.getCore().byId("VSP_ID").getValue();
						var vsp_name = sap.ui.getCore().byId("VSP_NAME").getValue();
						var vsp_address = sap.ui.getCore().byId("VSP_ADDRESS").getValue();
						var vsp_water_capacity = sap.ui.getCore().byId("VSP_WATER_CAPACITY").getValue();
						var vsp_water_min = sap.ui.getCore().byId("VSP_WATER_MIN").getValue();

						// Create a new Object with the new data 
						var oObject = {};
						oObject = {
							"ID_VSP": vsp_ID,
							"NAME_VSP": vsp_name,
							"ADDRESS": vsp_address,
							"WATER_CAPACITY": vsp_water_capacity,
							"WATER_MIN": vsp_water_min
						};
						// Service URL
						// Create the Model for the service
						// Add the new Object into the EntitySet
						var sServiceUrl = "/iot/iot/iot.xsodata/";
						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
							json: true,
							useBatch: false,
							defaultBindingMode: "TwoWay"
						});

						oModel.create("/IOT_VSP", oObject);
						// Refresh the Model
						oModel.setRefreshAfterChange(false);
						// Close the popup
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		OnAdd1: function (oEvent) {
			// Get the number of OrgUnits in the EntitySet OrgUnits
			// Calculate the new OrgUnit ID 
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Добавьте новое ВСП",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Label({
									text: "ID ВСП"
								}),
								new sap.m.Label({
									text: "Название ВСП:"
								}),
								new sap.m.Label({
									text: "Адрес ВСП:"
								}),
								new sap.m.Label({
									text: "Вода макс ВСП:"
								}),
								new sap.m.Label({
									text: "Вода мин ВСП:"
								})
							]
						}),
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Input("G_DEVICE"),
								new sap.m.Input("ID_VSP")
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function () {
						// Read the Values from the PopUp
						var vsp_ID = sap.ui.getCore().byId("ID_VSP").getValue();
						var g_device = sap.ui.getCore().byId("G_DEVICE").getValue();

						// Create a new Object with the new data 
						var oObject = {};
						oObject = {
							"G_DEVICE": g_device,
							"ID_VSP": vsp_ID
						};
						// Service URL
						// Create the Model for the service
						// Add the new Object into the EntitySet
						var sServiceUrl = "/iot/iot/iot.xsodata/";
						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
							json: true,
							useBatch: false,
							defaultBindingMode: "TwoWay"
						});

						oModel.create("/IOT_MAP", oObject);
						// Refresh the Model
						oModel.setRefreshAfterChange(false);
						// Close the popup
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		OnEdit: function (oEvent) {
			//Get the selected item in the list 
			var oVSPUnit = this._item;
			console.warn(oVSPUnit);
			// Get the OrgUnit ID value
			var oVSPUnitID = oVSPUnit["ID_VSP"];
			var oVSPUnitNAME = oVSPUnit["NAME_VSP"];
			var oVSPUnitADDRESS = oVSPUnit["ADDRESS"];
			var oVSPUnitWATER_CAP = oVSPUnit["WATER_CAPACITY"];
			var oVSPUnitWATER_MIN = oVSPUnit["WATER_MIN"];

			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Add Organization Unit",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Label({
									text: "ID ВСП:"
								}),
								new sap.m.Label({
									text: "Название ВСП:"
								}),
								new sap.m.Label({
									text: "Адрес ВСП:"
								}),
								new sap.m.Label({
									text: "ВОДА! ВСП:"
								}),
								new sap.m.Label({
									text: "ДРУГАЯ ВОДА! ВСП:"
								})
							]
						}),
						new sap.ui.layout.VerticalLayout({
							content: [
								new sap.m.Input("VSPUnitID", {
									value: oVSPUnitID,
									editable: false
								}),
								new sap.m.Input("VSPUnitNAME", {
									value: oVSPUnitNAME
								}),
								new sap.m.Input("VSPUnitADDRESS", {
									value: oVSPUnitADDRESS
								}),
								new sap.m.Input("VSPUnitWATER_CAPACITY", {
									value: oVSPUnitWATER_CAP
								}),
								new sap.m.Input("VSPUnitWATER_MIN", {
									value: oVSPUnitWATER_MIN
								})
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function () {
						// Get new values
						var sVSPUnitID = sap.ui.getCore().byId("VSPUnitID").getValue();
						var sVSPUnitNAME = sap.ui.getCore().byId("VSPUnitNAME").getValue();
						var sVSPUnitADDRESS = sap.ui.getCore().byId("VSPUnitADDRESS").getValue();
						var sVSPUnitWATER_CAPACITY = sap.ui.getCore().byId("VSPUnitWATER_CAPACITY").getValue();
						var sVSPUnitWATER_MIN = sap.ui.getCore().byId("VSPUnitWATER_MIN").getValue();
						// Create Object
						var oObject = {};
						oObject = {
							"ID_VSP": sVSPUnitID,
							"NAME_VSP": sVSPUnitNAME,
							"ADDRESS": sVSPUnitADDRESS,
							"WATER_CAPACITY": sVSPUnitWATER_CAPACITY,
							"WATER_MIN": sVSPUnitWATER_MIN
						};
						console.warn(oObject);
						// Create the path		
						var sPath = "/IOT_VSP(" + sVSPUnitID + ")";
						// service URL
						var sServiceUrl = "/iot/iot/iot.xsodata/";
						// Create Model
						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
							json: true,
							useBatch: false,
							defaultBindingMode: "TwoWay"
						}); // Update the Model
						oModel.update(sPath, oObject);
						//Refresh the Model
						oModel.setRefreshAfterChange(false);
						// Close dialog box		
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		OnEdit1: function (oEvent) {
			//Get the selected item in the list 
			var oVSPUnit = this._item1;
			// Get the OrgUnit ID value
			var oVSPUnitID = oVSPUnit["ID_VSP"];
			var oG_device = oVSPUnit["G_DEVICE"];
			// call Dialog popup
			var dialog = new sap.m.Dialog({
				title: "Add Organization Unit",
				type: "Message",
				content: [new sap.ui.layout.HorizontalLayout({
					content: [
						new sap.ui.layout.VerticalLayout({
							width: "140px",
							content: [
								new sap.m.Label({
									text: "G_device:"
								}),
								new sap.m.Label({
									text: "ID ВСП:"
								})
							]
						}),
						new sap.ui.layout.VerticalLayout({
							content: [
								new sap.m.Input("G_device", {
									value: oG_device,
									nullable: false
								}),
								new sap.m.Input("VSPID", {
									value: oVSPUnitID
								}),
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: "Save",
					press: function () {
						// Get new values
						var sVSPUnitID = sap.ui.getCore().byId("VSPID").getValue();
						var sG_device = sap.ui.getCore().byId("G_device").getValue();
						// Create Object
						var oObject = {};
						oObject = {
							"G_DEVICE": sG_device,
							"ID_VSP": sVSPUnitID,
						};
						console.warn(oObject);
						// Create the path		
						var sPath = "/IOT_MAP('" + sG_device + "')";
						// service URL
						var sServiceUrl = "/iot/iot/iot.xsodata/";
						// Create Model
						var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
							json: true,
							useBatch: false,
							defaultBindingMode: "TwoWay"
						}); // Update the Model
						oModel.update(sPath, oObject);
						//Refresh the Model
						oModel.setRefreshAfterChange(false);
						// Close dialog box		
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
		},
		OnDelete: function (oEvent) {

			// Get the selected Item
			var oOrgUnit = this._item;
			// Get the OrgUnit ID	
			var oOrgUnitID = oOrgUnit.ID_VSP;
			// Populate the Path
			var sPath = "/IOT_VSP(" + oOrgUnitID + ")";
			// Service URL
			var sServiceUrl = "/iot/iot/iot.xsodata/";
			// Create the Model	
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
				json: true,
				useBatch: false,
				defaultBindingMode: "TwoWay"
			}); // Delete the Object	
			oModel.remove(sPath);
			// Refresh	
			oModel.setRefreshAfterChange(true);
		},
		OnDelete1: function (oEvent) {

			// Get the selected Item
			var oOrgUnit = this._item1;
			// Get the OrgUnit ID	
			var oOrgUnitID = oOrgUnit.G_DEVICE;
			// Populate the Path
			var sPath = "/IOT_MAP('" + oOrgUnitID + "')";
			// Service URL
			var sServiceUrl = "/iot/iot/iot.xsodata/";
			// Create the Model	
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
				json: true,
				useBatch: false,
				defaultBindingMode: "TwoWay"
			}); // Delete the Object	
			oModel.remove(sPath);
			// Refresh	
			oModel.setRefreshAfterChange(true);
		},
		OnSelectionChange: function (oEvent) {
			this._item = oEvent.getSource().getBindingContext().getObject();
			var sQuery1 = parseInt(this._item["ID_VSP"])
			console.warn(sQuery1);
			var oView1 = this.getView();
			var oTable1 = oView1.byId("Table1");
			var oBinding1 = oTable1.getBinding("items");

			var aFilters1 = new sap.ui.model.Filter([
				new sap.ui.model.Filter("ID_VSP", sap.ui.model.FilterOperator.EQ, sQuery1)
			], false);
			oBinding1.filter(aFilters1);

		},
		OnSelectionChange1: function (oEvent) {
			// Store the selected item in the Object this 	
			this._item1 = oEvent.getSource().getBindingContext().getObject();
			console.warn(this._item);
		},
		onFilter: function (oEvent) {
			var sQuery = oEvent.getParameter("query");
			console.warn(sQuery);

			var oView = this.getView();
			var oTable = oView.byId("table");
			var oBinding = oTable.getBinding("items");
			var aFilters = new sap.ui.model.Filter([
				new sap.ui.model.Filter("NAME_VSP", sap.m.StringFilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("ADDRESS", sap.m.StringFilterOperator.Contains, sQuery)
			], false);
			oBinding.filter(aFilters);
		},
		onFilter1: function (oEvent) {
			var sQuery1 = oEvent.getParameter("query");
			console.warn(sQuery1);
			var oView1 = this.getView();
			var oTable1 = oView1.byId("Table1");
			var oBinding1 = oTable1.getBinding("items");
			var aFilters1 = new sap.ui.model.Filter([
				new sap.ui.model.Filter("G_DEVICE", sap.ui.model.FilterOperator.Contains, sQuery1),
			], false);

			oBinding1.filter(aFilters1);
		},
		onFilter1_a: function (oEvent) {
			var sQuery1 = oEvent.getParameter("query");
			console.warn(sQuery1);
			var oView1 = this.getView();
			var oTable1 = oView1.byId("Table1");
			var oBinding1 = oTable1.getBinding("items");
			var aFilters1 = new sap.ui.model.Filter([
				new sap.ui.model.Filter("G_DEVICE", sap.ui.model.FilterOperator.Contains, sQuery1)
			], false);
			oBinding1.filter(aFilters1);
		},
		onTableSettings: function (oEvent) {
			this._oDialog = sap.ui.xmlfragment("xtext.xtext.controller.SettingsDialog", this);
			this._oDialog.open();
		},
		onTableSettings1: function (oEvent) {
			this._oDialog = sap.ui.xmlfragment("xtext.xtext.controller.SettingsDialog1", this);
			this._oDialog.open();
		},
		onConfirm: function (oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("table");
			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");
			// apply grouping 
			var aSorters = [];
			// apply sorter 
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
		},
		onConfirm1: function (oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("Table1");
			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");
			// apply grouping 
			var aSorters = [];
			// apply sorter 
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
		},
	});
});