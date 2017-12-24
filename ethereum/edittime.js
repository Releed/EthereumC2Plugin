﻿function GetPluginSettings()
{
	return {
		"name":			"Ethereum",
		"id":			"Ethereum",
		"version":		"1.0",
		"description":	"Access Ethereum API features.",
		"author":		"Scirra",
		"help url":		"http://www.scirra.com/manual/112/Ethereum",
		"category":		"Platform specific",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		pf_singleglobal,
		"cordova-plugins": "cordova-plugin-inappbrowser",
		"dependency":	"channel.html"
	};
};

//////////////////////////////////////////////////////////////
// Conditions

AddCondition(0, cf_trigger, "On contract loaded", "Ethereum", "On contract loaded", "Triggered when the contract is loaded", "OnContractLoaded");

AddStringParam("ID", "The id of the callback to wait for.");
AddCondition(1, cf_trigger, "On function success", "Callbacks", "On function success with ID: {0}", "Triggered when a function returns with no error.", "OnFunctionSuccess");

AddStringParam("ID", "The id of the callback to wait for.");
AddCondition(2, cf_trigger, "On function error", "Callbacks", "On function error with ID: {0}", "Triggered when a function returns with an error.", "OnFunctionError");

AddStringParam("ID", "The id of the callback to wait for.");
AddCondition(3, cf_trigger, "On function callback", "Callbacks", "On function callback with ID: {0}", "Triggered when a function returns, with or without error.", "OnFunctionCallback");

//////////////////////////////////////////////////////////////
// Actions

AddStringParam("Name with parameters types", "The name of the function to call, in the form 'myMethod(uint256)'.");
AddStringParam("Parameters", "The parameters to send, separated by commas.");
AddStringParam("Callback id", "The id for identifying the callback.");
AddAction(0, 0, "Call", "Ethereum", "Call constant method {0} with parameters {1}", "Call a Constant Method", "Call");

AddStringParam("Name with parameters types", "The name of the function to call, in the form 'myMethod(uint256)'.");
AddStringParam("Parameters", "The parameters to send, separated by commas.");
AddStringParam("Callback id", "The id for identifying the callback.");
AddAction(1, 0, "Send", "Ethereum", "Call non-constant method {0} with parameters {1}", "Call a Non-Constant Method", "Send");

//////////////////////////////////////////////////////////////
// Expressions

AddExpression(0, ef_return_string, "Current Account", "Ethereum", "CurrentAccount", "Get the Current Account Address.");
AddExpression(1, ef_return_string, "Current Callback Function", "Ethereum", "CurrentCallbackFunction", "Get the Current Callback Function.");
AddExpression(2, ef_return_string, "Current Callback ID", "Ethereum", "CurrentCallbackId", "Get the Current Callback ID.");
AddExpression(3, ef_return_string, "Current Callback Error Message", "Ethereum", "CurrentCallbackError", "Get the Current Callback Function's error message.");
AddExpression(4, ef_return_string, "Current Callback Response", "Ethereum", "CurrentCallbackResponse", "Get the Current Callback Function's response.");


//////////////////////////////////////////////////////////////
ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_text,		"Contract address",		"",			"The contract's address."),
	new cr.Property(ept_text,		"Contract ABI",			"",			"The contract's ABI array")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
