var center = Style({
	if (this.display is 'block'):
		margin.left = 'auto';
		margin.right = 'auto';
	else:
		text.align = "center";
	end;
});

var colorGrayDark = Style({
	background.color = '#444444';
	color: "#CECECE";
});

var colorGrayMedium = Style({
	background.color = '#EEEEEE';
	color: '#111111';
});

var colorGrayLight = Style({
	background.color = '#FFFFFF';
	color: '#343434';
});

return Style(colorGrayDark, {
	this('.container', center, colorGrayMedium, {
		width = 960;
		min.height = 'fill';
		this('nav', colorGrayLight, {
			height: 60;
			width: 'fill';
		});
		this('headerImg', center, {
			width: 750;
			height: 150;
		});
	});
});