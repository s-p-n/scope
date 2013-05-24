#include <v8.h>
#include <node.h>
#include <iostream>
#include <string>

using namespace std;
using namespace node;
using namespace v8;

Handle<Value> Method(const Arguments& args) {
    HandleScope scope;
    string mystr;

    cout << "\n > ";

    getline(cin, mystr);
    cout << "\n";
    return scope.Close(String::New(mystr.c_str()));

    //return scope.Close(String::New());
}

void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "read", Method);
}

NODE_MODULE(Console, init);
