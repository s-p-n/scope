var abs_path = (cwd: "/", file: "") {
	return if file[0] is "/":
		file;
	else if file[0:2] is "./":
		abs_path(cwd, file[2:]);
	else if file[0:3] is "../":
		abs_path(Text.rsplit(cwd, "/", 1)[0], file[3:]);
	else:
		cwd & "/" & file;
	end;
};

var path = abs_path("/home/spence", "./../spence/file.txt");

print(path); // /home/spence/file.txt
