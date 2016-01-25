/*
 * Author: Daniel Holmlund <daniel.w.holmlund@Intel.com>
 * Copyright (c) 2015 Intel Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


function trigger_rules(mode_config)
{
	var DimmerStatus2;
	var HueStatus;
	var LockStatus;
	console.log("config_name is " + mode_config);
	var lr = new LineByLineReader(mode_config);
	lr.on('error', function (err) {
		// 'err' contains error object
		logger.verbose(err);
	});
	lr.on('line', function (line) {
		var thing = JSON.parse(line)|| {};
		switch(thing.device_type){
			case "zb-dimmer":
				thingsModel.HLthingsModel.zb_dimmerLevel = thing.control[0].value;
				DimmerStatus2 = thing;
				controlDimmer(DimmerStatus2);
				break;
			case "zb-hue-bulb":
				if(thing.device_id == config.HueBulbDeviceId) {
					thingsModel.HLthingsModel.hue_colorR=thing.control[0].controlR;
					thingsModel.HLthingsModel.hue_colorG=thing.control[0].controlG;
					thingsModel.HLthingsModel.hue_colorB=thing.control[0].controlB;
					thingsModel.HLthingsModel.hue_value = thing.control[0].value;
					HueStatus = thing;
				} else if(thing.device_id == config.HueBulbDeviceId2){
					thingsModel.HLthingsModel.hue2_colorR=thing.control[0].controlR;
					thingsModel.HLthingsModel.hue2_colorG=thing.control[0].controlG;
					thingsModel.HLthingsModel.hue2_colorB=thing.control[0].controlB;
					thingsModel.HLthingsModel.hue2_value = thing.control[0].value;
					HueStatus = thing;
				} else if(thing.device_id == config.HueBulbDeviceId3) {
					thingsModel.HLthingsModel.hue3_colorR=thing.control[0].controlR;
					thingsModel.HLthingsModel.hue3_colrG=thing.control[0].controlG;
					thingsModel.HLthingsModel.hue3_colorB=thing.control[0].controlB;
					thingsModel.HLthingsModel.hue3_value = thing.control[0].value;
					HueStatus = thing;
				} else if(thing.device_id == config.HueBulbDeviceId4){
					thingsModel.HLthingsModel.hue4_colorR=thing.control[0].controlR;
					thingsModel.HLthingsModel.hue4_colorG=thing.control[0].controlG;
					thingsModel.HLthingsModel.hue4_colorB=thing.control[0].controlB;
					thingsModel.HLthingsModel.hue4_value = thing.control[0].value;
					HueStatus = thing;
				} else if(thing.device_id == config.HueBulbDeviceId5) {
					thingsModel.HLthingsModel.hue5_colorR=thing.control[0].controlR;
					thingsModel.HLthingsModel.hue5_colrG=thing.control[0].controlG;
					thingsModel.HLthingsModel.hue5_colorB=thing.control[0].controlB;
					thingsModel.HLthingsModel.hue5_value = thing.control[0].value;
					HueStatus = thing;
				}
				controlHue(HueStatus);
				break;
			case "zb-smartplug" :
				thingsModel.HLthingsModel.zb_walloutlet = thing.control[0].state;
				smartplugStatus = thing;
				controlWalloutlet(smartplugStatus);
				break;
			case "zb-smartswitch" :
				thingsModel.HLthingsModel.zb_smartswitch = thing.control[0].state;
				smartSwitchStatus = thing;
				controlSmartswitch(smartSwitchStatus);
				break;
			case "zw_thermostat":
				if(thing.control[0].mode=="cool"){
					thingsModel.HLthingsModel.thermostatMode = "Cooling";
					thingsModel.HLthingsModel.coolingTemperature = thing.control[0].target_temp;
				} else{
					thingsModel.HLthingsModel.thermostatMode = "Heating";
					thingsModel.HLthingsModel.heatingTemperature = thing.control[0].target_temp;
				}
				thermostatStatus = thing;
				controlThermostat(thermostatStatus);
				break;

			case "zb_door_lock" :
				thingsModel.HLthingsModel.zb_doorlock = thing.control[0].state;
				LockStatus = thing;
				controlDoorlock(LockStatus);
				break;
		}
	});
	lr.on('end', function () {
		console.log("End of Rule");
	});
}
