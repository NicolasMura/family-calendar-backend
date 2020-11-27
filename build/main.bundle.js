!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=16)}([function(e,t){e.exports=require("joi")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("bcrypt")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("swagger-ui-express")},function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("crypto")},function(e){e.exports=JSON.parse('{"openapi":"3.0.0","info":{"title":"Node-Typescript API","version":"1.0.0","description":"A sample API"},"servers":[{"url":"http://localhost:3000"}],"paths":{"/auth/signup/":{"post":{"description":"sign up user to application","tags":["auth"],"requestBody":{"description":"sign up body","required":true,"content":{"application/json":{"schema":{"$ref":"#/components/schemas/UserSchema"},"example":{"email":"test.user@mail.com","password":"test_test"}}}},"responses":{"200":{"description":"user successfuly signed in","content":{"appication/json":{"example":{"status":200,"logged":true,"message":"Sign in successfull!!"}}}},"400":{"description":"sign in failed","content":{"application/json":{"example":{"status":400,"logged":false,"message":"Email already exists"}}}}}}},"/auth/login/":{"post":{"description":"Login user to application","tags":["auth"],"requestBody":{"description":"login body","required":true,"content":{"application/json":{"schema":{"$ref":"#/components/schemas/UserSchema"},"example":{"email":"test.user@mail.com","password":"test_test"}}}},"responses":{"200":{"description":"user successfuly logged","content":{"appication/json":{"example":{"status":200,"logged":true,"message":"Successfully logged!"}}}},"401":{"description":"Not logged, invalid credentials","content":{"application/json":{"example":{"status":401,"logged":false,"message":"Invalid credentials"}}}}}}},"/v1/events":{"get":{"description":"Get all stored events in Database","tags":["events"],"security":[{"ApiKeyAuth":[]}],"responses":{"200":{"description":"An array of events","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/Events"}]}}}},"default":{"description":"unexpected error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Error"}}}}}},"post":{"description":"Create new Event","tags":["events"],"security":[{"ApiKeyAuth":[]}],"requestBody":{"description":"event creation request body","required":true,"content":{"application/json":{"schema":{"$ref":"#/components/schemas/EventSchema"},"example":{"title":"eventTitle","startDate":1605285140,"endDate":1605288734,"usersIds":["5fad67c14dde0c65bd1ea312"]}}}},"responses":{"201":{"description":"return created event","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/EventSchema"}]}}}},"default":{"description":"unexpected error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Error"}}}}}}},"/v1/events/{id}":{"get":{"description":"Get event by eventId","tags":["events"],"security":[{"ApiKeyAuth":[]}],"parameters":[{"in":"path","name":"id","description":"the unique eventId","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"return event by id","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/Eventchema"}]}}}}}},"delete":{"description":"Delete event by eventId","tags":["events"],"security":[{"ApiKeyAuth":[]}],"parameters":[{"in":"path","name":"id","description":"the unique eventId","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"return deleted event","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/EventSchema"}]}}}}}}},"/v1/users":{"get":{"description":"Get all stored users in Database","tags":["users"],"security":[{"ApiKeyAuth":[]}],"responses":{"200":{"description":"An array of users","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/Users"}]}}}},"default":{"description":"unexpected error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Error"}}}}}},"post":{"description":"Create new User","tags":["users"],"security":[{"ApiKeyAuth":[]}],"requestBody":{"description":"user creation request body","required":true,"content":{"application/json":{"schema":{"$ref":"#/components/schemas/UserSchema"},"example":{"name":"userName","email":"test.user@mail.com"}}}},"responses":{"201":{"description":"return created user","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/UserSchema"}]}}}},"default":{"description":"unexpected error","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Error"}}}}}}},"/v1/users/{id}":{"get":{"description":"Get user by userId","tags":["users"],"security":[{"ApiKeyAuth":[]}],"parameters":[{"in":"path","name":"id","description":"the unique userId","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"return user by id","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/UserSchema"}]}}}}}},"delete":{"description":"Delete user by userId","tags":["users"],"security":[{"ApiKeyAuth":[]}],"parameters":[{"in":"path","name":"id","description":"the unique userId","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"return deleted user","content":{"application/json":{"schema":{"oneOf":[{"$ref":"#/components/schemas/UserSchema"}]}}}}}}}},"components":{"schemas":{"EventSchema":{"properties":{"title":{"type":"string"},"startDate":{"type":"string"},"endDate":{"type":"string"},"reminders":{"type":"array"},"usersIds":{"type":"array"}},"required":["title","startDate","usersIds"],"examples":{"title":"Echographie n°3 !","startDate":"1605285140","usersIds":["5fbec6aea71e9a5d16e11037"]}},"Events":{"type":"array","items":{"$ref":"#/components/schemas/EventSchema"}},"UserSchema":{"properties":{"id":{"type":"string"},"mobile":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"passwordResetToken":{"type":"string"},"passwordResetExpires":{"type":"string","format":"date"},"tokens":{"type":"array"},"profile":{"properties":{"isChild":{"type":"boolean"},"name":{"type":"string"},"gender":{"type":"string"},"location":{"type":"string"},"picture":{"type":"string"}},"required":["isChild","name"]}},"required":["email","password"],"examples":{"mobile":"0033648347451","email":"1605285140","password":"bob","profile":{"isChild":false,"name":"Julie"}}},"Users":{"type":"array","items":{"$ref":"#/components/schemas/UserSchema"}},"Error":{"type":"object","required":["status","message"],"properties":{"status":{"type":"integer","description":"HTTP status code","example":200},"message":{"type":"string","description":"Error description","example":"User created"}}}},"securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"x-access-token"}}},"tags":[]}')},function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"signup",(function(){return J})),r.d(n,"login",(function(){return F}));var s={};r.r(s),r.d(s,"findAll",(function(){return Z})),r.d(s,"findOne",(function(){return ee})),r.d(s,"create",(function(){return te})),r.d(s,"remove",(function(){return re}));var o={};r.r(o),r.d(o,"findAll",(function(){return fe})),r.d(o,"findOne",(function(){return de})),r.d(o,"create",(function(){return he})),r.d(o,"remove",(function(){return me}));var i=r(3),a=r(8);var c,u=r(2),l=r(6),p=r(9),f=r(10),d=r(11),h=r(12),m=(c=function(e,t){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}c(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),y=function(e){function t(t,r){var n=e.call(this,r)||this;return Error.captureStackTrace(n,n.constructor),n.status=t||500,n.name=n.name,n.message=r||i.STATUS_CODES[n.status]||"Error",n}return m(t,e),t}(Error),g=y;function v(e,t,r){t.sendHttpError=function(r){t.status(r.status),e.xhr||e.is("json")||e.is("json")&&e.get("Accept")||!e.get("Accept")||-1===e.get("Accept").indexOf("html")?t.json({status:r.status,name:r.name,message:r.message}):t.send(b(r))},r()}var b=function(e){return e?"<div style='text-align: center;'><p>Status: "+e.status+"</p><p>Name: "+e.name+"</p><p>"+e+"</p></div>":""};var w=r(4);function O(e,t,r){var n=e.headers["x-access-token"];if(n)try{var s=w.verify(n,Se.get("secret"));return e.user=s,r()}catch(e){return r(new g(401,i.STATUS_CODES[401]))}return r(new g(400,"No token provided"))}var j=r(7),x=r(0),E=r(1),S=function(){this.messageObjectId="Argument passed in must be a single String of 12 bytes or a string of 24 hex characters",this.customJoi=x.extend({name:"objectId",language:{base:this.messageObjectId},pre:function(e,t,r){return E.Types.ObjectId.isValid(e)?e:this.createError("objectId.base",{value:e},t,r)}})},_=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),A=new(function(e){function t(){return e.call(this)||this}return _(t,e),t.prototype.createUser=function(e){var t=x.object().keys({isChild:x.boolean().required(),name:x.string().required(),gender:x.string(),location:x.string(),picture:x.string()}).required(),r=x.object().keys({mobile:x.string(),password:x.string().required(),email:x.string().email({minDomainAtoms:2}).required(),profile:t});return x.validate(e,r)},t.prototype.getUser=function(e){var t=x.object().keys({password:x.string().required(),email:x.string().email({minDomainAtoms:2}).required()});return x.validate(e,t)},t}(S)),P=r(5);r(13).config();var q={port:process.env.PORT||3e3,database:{MONGODB_URI:process.env.MONGODB_URI||"mongodb://localhost:27017/",MONGODB_DB_MAIN:process.env.MONGODB_DB_MAIN||"users_db"},secret:process.env.SECRET||"@QEGTUI"},D={port:process.env.PORT||3e3,database:{MONGODB_URI:process.env.MONGODB_URI||"mongodb://production_uri/",MONGODB_DB_MAIN:process.env.MONGODB_DB_MAIN||"users_db"},secret:process.env.SECRET||"@QEGTUI"},k={test:{port:process.env.PORT||3e3,database:{MONGODB_URI:process.env.MONGODB_URI||"mongodb://localhost:27017",MONGODB_DB_MAIN:process.env.MONGODB_DB_MAIN||"users_db"},secret:process.env.SECRET||"@QEGTUI"},development:q,production:D}.production,I=""+k.database.MONGODB_URI+k.database.MONGODB_DB_MAIN,T=E.createConnection(I,{useUnifiedTopology:!0,useCreateIndex:!0,useNewUrlParser:!0});T.on("connecting",(function(){console.log("[32m","MongoDB :: connecting"),console.log(I)})),T.on("error",(function(e){console.log("[31m","MongoDB :: connection "+e),E.disconnect()})),T.on("connected",(function(){console.log("[32m","MongoDB :: connected"),console.log(I)})),T.once("open",(function(){console.log("[32m","MongoDB :: connection opened"),console.log(I)})),T.on("reconnected",(function(){console.log('[33m"',"MongoDB :: reconnected")})),T.on("reconnectFailed",(function(){console.log("[31m","MongoDB :: reconnectFailed")})),T.on("disconnected",(function(){console.log("[31m","MongoDB :: disconnected")})),T.on("fullsetup",(function(){console.log('[33m"',"MongoDB :: reconnecting... %d")}));var U=r(14),M=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},B=function(e,t){var r,n,s,o,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},N=new E.Schema({mobile:{type:String,trim:!0,default:""},email:{type:String,unique:!0,trim:!0},password:String,passwordResetToken:String,passwordResetExpires:Date,tokens:Array,profile:{isChild:Boolean,name:String,gender:{type:String,default:""},location:{type:String,default:""},picture:{type:String,default:""}}},{collection:"usermodel",versionKey:!1}).pre("save",(function(e){return M(this,void 0,Promise,(function(){var t,r,n,s;return B(this,(function(o){switch(o.label){case 0:if(!(t=this).isModified("password"))return[2,e()];o.label=1;case 1:return o.trys.push([1,4,,5]),[4,P.genSalt(10)];case 2:return r=o.sent(),[4,P.hash(t.password,r)];case 3:return n=o.sent(),t.password=n,e(),[3,5];case 4:return s=o.sent(),[2,e(s)];case 5:return[2]}}))}))}));N.methods.comparePassword=function(e){return M(this,void 0,Promise,(function(){return B(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,P.compare(e,this.password)];case 1:return[2,t.sent()];case 2:return[2,t.sent()];case 3:return[2]}}))}))},N.methods.gravatar=function(e){return e||(e=200),this.email?"https://gravatar.com/avatar/"+U.createHash("md5").update(this.email).digest("hex")+"?s="+e+"&d=retro":"https://gravatar.com/avatar/?s="+e+"&d=retro"};var G=T.model("UserModel",N),R=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},C=function(e,t){var r,n,s,o,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},$={createUser:function(e){return R(this,void 0,Promise,(function(){var t,r,n;return C(this,(function(s){switch(s.label){case 0:console.log(e),s.label=1;case 1:if(s.trys.push([1,4,,5]),t=A.createUser(e),console.log("validate",t),t.error)throw new Error(t.error.message);return r=new G({mobile:e.mobile||"",email:e.email,password:e.password,profile:e.profile}),console.log("user",r),[4,G.findOne({email:e.email})];case 2:if(s.sent())throw new Error("This email already exists");return[4,r.save()];case 3:return[2,s.sent()];case 4:throw n=s.sent(),new Error(n);case 5:return[2]}}))}))},getUser:function(e){return R(this,void 0,Promise,(function(){var t,r,n,s;return C(this,(function(o){switch(o.label){case 0:if(o.trys.push([0,4,,5]),(t=A.getUser(e)).error)throw new Error(t.error.message);return[4,G.findOne({email:e.email})];case 1:return r=o.sent(),(n=r)?[4,r.comparePassword(e.password)]:[3,3];case 2:n=o.sent(),o.label=3;case 3:if(n)return[2,r];throw new Error("Invalid password or email");case 4:throw s=o.sent(),new Error(s);case 5:return[2]}}))}))}},K=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},H=function(e,t){var r,n,s,o,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};function J(e,t,r){return K(this,void 0,Promise,(function(){var n,s,o;return H(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,$.createUser(e.body)];case 1:return n=i.sent(),s=w.sign({email:n.email},Se.get("secret"),{}),t.json({token:s,status:200,logged:!0,message:"Sign in successfull"}),[3,3];case 2:return 500===(o=i.sent()).code?[2,r(new g(o.message.status,o.message))]:(t.json({status:400,message:o.message}),[3,3]);case 3:return[2]}}))}))}function F(e,t,r){return K(this,void 0,Promise,(function(){var n,s,o;return H(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,$.getUser(e.body)];case 1:return n=i.sent(),s=w.sign({email:n.email},Se.get("secret"),{}),t.json({token:s,status:200,logged:!0,message:"Sign in successfull"}),[3,3];case 2:return 500===(o=i.sent()).code?[2,r(new g(o.message.status,o.message))]:(t.json({status:400,message:o.message}),[3,3]);case 3:return[2]}}))}))}var L=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Q=new(function(e){function t(){return e.call(this)||this}return L(t,e),t.prototype.createUser=function(e){var t=x.object().keys({isChild:x.boolean().required(),name:x.string().required(),gender:x.string(),location:x.string(),picture:x.string()}).required(),r=x.object().keys({mobile:x.string(),name:x.string().required(),email:x.string().email({minDomainAtoms:2}).required(),profile:t});return x.validate(e,r)},t.prototype.getUser=function(e){var t=x.object().keys({id:this.customJoi.objectId().required()});return x.validate(e,t)},t.prototype.removeUser=function(e){var t=x.object().keys({id:this.customJoi.objectId().required()});return x.validate(e,t)},t}(S)),z=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},V=function(e,t){var r,n,s,o,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},W={findAll:function(){return z(this,void 0,Promise,(function(){var e;return V(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,G.find({})];case 1:return[2,t.sent()];case 2:throw e=t.sent(),new Error(e.message);case 3:return[2]}}))}))},findOne:function(e){return z(this,void 0,Promise,(function(){var t,r;return V(this,(function(n){switch(n.label){case 0:if(n.trys.push([0,2,,3]),(t=Q.getUser({id:e})).error)throw new Error(t.error.message);return[4,G.findOne({_id:E.Types.ObjectId(e)})];case 1:return[2,n.sent()];case 2:throw r=n.sent(),new Error(r.message);case 3:return[2]}}))}))},insert:function(e){return z(this,void 0,Promise,(function(){var t,r;return V(this,(function(n){switch(n.label){case 0:if(n.trys.push([0,2,,3]),(t=Q.createUser(e)).error)throw new Error(t.error.message);return[4,G.create(e)];case 1:return[2,n.sent()];case 2:throw r=n.sent(),new Error(r.message);case 3:return[2]}}))}))},remove:function(e){return z(this,void 0,Promise,(function(){var t,r;return V(this,(function(n){switch(n.label){case 0:if(n.trys.push([0,2,,3]),(t=Q.removeUser({id:e})).error)throw new Error(t.error.message);return[4,G.findOneAndRemove({_id:E.Types.ObjectId(e)})];case 1:return[2,n.sent()];case 2:throw r=n.sent(),new Error(r.message);case 3:return[2]}}))}))}},X=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},Y=function(e,t){var r,n,s,o,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};function Z(e,t,r){return X(this,void 0,Promise,(function(){var e,n;return Y(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,W.findAll()];case 1:return e=s.sent(),t.status(200).json(e),[3,3];case 2:return n=s.sent(),r(new y(n.message.status,n.message)),[3,3];case 3:return[2]}}))}))}function ee(e,t,r){return X(this,void 0,Promise,(function(){var n,s;return Y(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,W.findOne(e.params.id)];case 1:return n=o.sent(),t.status(200).json(n),[3,3];case 2:return s=o.sent(),r(new y(s.message.status,s.message)),[3,3];case 3:return[2]}}))}))}function te(e,t,r){return X(this,void 0,Promise,(function(){var n,s;return Y(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,W.insert(e.body)];case 1:return n=o.sent(),t.status(201).json(n),[3,3];case 2:return s=o.sent(),r(new y(s.message.status,s.message)),[3,3];case 3:return[2]}}))}))}function re(e,t,r){return X(this,void 0,Promise,(function(){var n,s;return Y(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,W.remove(e.params.id)];case 1:return n=o.sent(),t.status(200).json(n),[3,3];case 2:return s=o.sent(),r(new y(s.message.status,s.message)),[3,3];case 3:return[2]}}))}))}var ne=new E.Schema({title:{type:String,trim:!0},startDate:String,endDate:{type:String,default:""},reminders:{type:Array,default:[]},usersIds:Array},{collection:"eventmodel",versionKey:!1}),se=T.model("EventModel",ne),oe=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ie=new(function(e){function t(){return e.call(this)||this}return oe(t,e),t.prototype.createEvent=function(e){var t=x.object().keys({title:x.string().required(),startDate:x.date().timestamp("unix"),endDate:x.date().timestamp("unix"),reminders:x.array().items(x.number()),usersIds:x.array().items(x.string()).min(1)});return x.validate(e,t)},t.prototype.getEvent=function(e){var t=x.object().keys({id:this.customJoi.objectId().required()});return x.validate(e,t)},t.prototype.removeEvent=function(e){var t=x.object().keys({id:this.customJoi.objectId().required()});return x.validate(e,t)},t}(S)),ae=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},ce=function(e,t){var r,n,s,o,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},ue={findAll:function(){return ae(this,void 0,Promise,(function(){var e;return ce(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,se.find({})];case 1:return[2,t.sent()];case 2:throw e=t.sent(),new Error(e.message);case 3:return[2]}}))}))},findOne:function(e){return ae(this,void 0,Promise,(function(){var t,r;return ce(this,(function(n){switch(n.label){case 0:if(n.trys.push([0,2,,3]),(t=ie.getEvent({id:e})).error)throw new Error(t.error.message);return[4,se.findOne({_id:E.Types.ObjectId(e)})];case 1:return[2,n.sent()];case 2:throw r=n.sent(),new Error(r.message);case 3:return[2]}}))}))},insert:function(e){return ae(this,void 0,Promise,(function(){var t,r;return ce(this,(function(n){switch(n.label){case 0:if(n.trys.push([0,2,,3]),(t=ie.createEvent(e)).error)throw new Error(t.error.message);return[4,se.create(e)];case 1:return[2,n.sent()];case 2:throw r=n.sent(),new Error(r.message);case 3:return[2]}}))}))},remove:function(e){return ae(this,void 0,Promise,(function(){var t,r;return ce(this,(function(n){switch(n.label){case 0:if(n.trys.push([0,2,,3]),(t=ie.removeEvent({id:e})).error)throw new Error(t.error.message);return[4,se.findOneAndRemove({_id:E.Types.ObjectId(e)})];case 1:return[2,n.sent()];case 2:throw r=n.sent(),new Error(r.message);case 3:return[2]}}))}))}},le=function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},pe=function(e,t){var r,n,s,o,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(s=2&o[0]?n.return:o[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;switch(n=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{r=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};function fe(e,t,r){return le(this,void 0,Promise,(function(){var e,n;return pe(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,ue.findAll()];case 1:return e=s.sent(),t.status(200).json(e),[3,3];case 2:return n=s.sent(),r(new g(n.message.status,n.message)),[3,3];case 3:return[2]}}))}))}function de(e,t,r){return le(this,void 0,Promise,(function(){var n,s;return pe(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,ue.findOne(e.params.id)];case 1:return n=o.sent(),t.status(200).json(n),[3,3];case 2:return s=o.sent(),r(new g(s.message.status,s.message)),[3,3];case 3:return[2]}}))}))}function he(e,t,r){return le(this,void 0,Promise,(function(){var n,s;return pe(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,ue.insert(e.body)];case 1:return n=o.sent(),t.status(201).json(n),[3,3];case 2:return s=o.sent(),r(new g(s.message.status,s.message)),[3,3];case 3:return[2]}}))}))}function me(e,t,r){return le(this,void 0,Promise,(function(){var n,s;return pe(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,ue.remove(e.params.id)];case 1:return n=o.sent(),t.status(200).json(n),[3,3];case 2:return s=o.sent(),r(new g(s.message.status,s.message)),[3,3];case 3:return[2]}}))}))}var ye=Object(u.Router)();ye.post("/signup",n.signup),ye.post("/login",n.login);var ge=ye,ve=Object(u.Router)();ve.get("/",s.findAll),ve.post("/",s.create),ve.get("/:id",s.findOne),ve.delete("/:id",s.remove);var be=ve,we=Object(u.Router)();we.get("/",o.findAll),we.post("/",o.create),we.get("/:id",o.findOne),we.delete("/:id",o.remove);var Oe,je=we;try{Oe=r(15)}catch(e){console.log("***************************************************"),console.log("  Seems like you doesn`t have swagger.json file"),console.log("  Please, run: "),console.log("  $ swagger-jsdoc -d swaggerDef.js -o swagger.json"),console.log("***************************************************")}var xe,Ee=u();(xe=Ee).use(l.urlencoded({extended:!1})),xe.use(l.json()),xe.use(f()),xe.use(p()),xe.use(h()),xe.use(d()),xe.use(v),xe.use((function(e,t,r){t.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS "),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"),t.header("Access-Control-Allow-Credentials","true"),r()})),function(e){var t=u.Router();e.use("/v1/users",O,be),e.use("/v1/events",O,je),e.use("/auth",ge),Oe?(e.use("/docs",j.serve),e.get("/docs",j.setup(Oe))):e.get("/docs",(function(e,t){t.send("<p>Seems like you doesn't have <code>swagger.json</code> file.</p><p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p><p>Then, restart your application</p>")})),e.use((function(e,t,r){t.status(404).send(i.STATUS_CODES[404])})),e.use(t)}(Ee),function(e){e.use((function(t,r,n,s){"number"==typeof t&&(t=new y(t)),t instanceof y?n.sendHttpError(t):"development"===e.get("env")?(t=new y(500,t.message),n.sendHttpError(t)):(t=new y(500),n.sendHttpError(t,t.message)),console.error(t)}))}(Ee),Ee.set("port",process.env.PORT||3e3),Ee.set("secret",process.env.SECRET||"superSecret");var Se=Ee,_e=i.createServer(Se);_e.listen(Se.get("port")),_e.on("error",(function(e){return function(e,t){if("listen"!==e.syscall)throw e;var r="string"==typeof t?"Pipe "+t:"Port "+t;switch(e.code){case"EACCES":console.error(r+" requires elevated privileges"),process.exit(1);break;case"EADDRINUSE":console.error(r+" is already in use"),process.exit(1);break;default:throw e}}(e,Se.get("port"))})),_e.on("listening",function(){var e=this.address(),t="string"==typeof e?"pipe "+e:"port "+e.port;a("Listening on "+t),console.log("Running on port ",t)}.bind(_e))}]);