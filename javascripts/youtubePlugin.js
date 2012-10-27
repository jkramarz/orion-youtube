/*global window orion */

window.onload = function() {

	function convertLinkToVideo(text){
	
		var regexr_from = '^http(s)?:\/\/(.*)youtu((be(-nocookie)?\\.com\/watch\\?v=)|(\\.be\/))([\\w]+)(.*)';
		var regexr_to = "^<iframe .* src=\"http(s)?://(.*)youtube(-nocookie)?\\.com/embed/([\\w]+)(.*)</iframe>$";
		
		if(text.search(regexr_from) > -1){
			//convert from link to video
			return '<iframe width="420" height="315" src="http://www.youtube-nocookie.com/embed/' + text.match(regexr_from).slice(-2)[0] + '?rel=0" frameborder="0" allowfullscreen></iframe>';
		}
		if(text.search(regexr_to) > -1){
			//convert from video to link
			return "http://youtu.be/" + text.match(regexr_to).slice(-2)[0];
		}
		return text;
	}
	// create the plugin
	var headers = {
		name: "Youtube video embedder",
		version: "0.2",
		description: "Plugin that provides conversion between YouTube video and to embedded player"
	};
	var provider = new orion.PluginProvider(headers);

	//editor command service	
	var serviceImpl = {
		run: function(selectedText, text, selection) {
			return convertLinkToVideo(selectedText);
		}
	};
	var serviceProps = {
		name: "Switch YouTube player",
		key: ["p", true, true]
	};
	provider.registerServiceProvider("orion.edit.command", serviceImpl, serviceProps);

	provider.connect();
};