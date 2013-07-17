module.exports = function runtimeError (line, msg, what) {
    //console.log("what:", what, line);
    return "($$$runtimeError(" +
        line + ", '" +
        msg.replace(/%typeStart%(.*)%end%/g, "'+Type("+what.replace(/\$/g, "$$$$")+")+'") + "', " +
        what +
    "))";
}
