!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("id64")},function(e,t){e.exports=require("computer-name")},function(e,t,n){const o=n(8),s=n(9);function r(e){console.log("[dotenv][DEBUG] "+e)}const i=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,a=/\\n/g,c=/\n|\r|\r\n/;function l(e,t){const n=Boolean(t&&t.debug),o={};return e.toString().split(c).forEach((function(e,t){const s=e.match(i);if(null!=s){const e=s[1];let t=s[2]||"";const n=t.length-1,r='"'===t[0]&&'"'===t[n];"'"===t[0]&&"'"===t[n]||r?(t=t.substring(1,n),r&&(t=t.replace(a,"\n"))):t=t.trim(),o[e]=t}else n&&r(`did not match key and value when parsing line ${t+1}: ${e}`)})),o}e.exports.config=function(e){let t=s.resolve(process.cwd(),".env"),n="utf8",i=!1;e&&(null!=e.path&&(t=e.path),null!=e.encoding&&(n=e.encoding),null!=e.debug&&(i=!0));try{const e=l(o.readFileSync(t,{encoding:n}),{debug:i});return Object.keys(e).forEach((function(t){Object.prototype.hasOwnProperty.call(process.env,t)?i&&r(`"${t}" is already defined in \`process.env\` and will not be overwritten`):process.env[t]=e[t]})),{parsed:e}}catch(e){return{error:e}}},e.exports.parse=l},function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Logger=t.createLogger=void 0,n(2).config();const s=o(n(1)),r=o(n(0)),i=n(10);t.createLogger=(e,t=[])=>new a(e,r.default.gen(!1),r.default.gen(!1),["kerykes","sensor-cloud",...t],s.default());class a{constructor(e,t,n,o,s){this.bSendLog=!1,this.readConfig(),this.objLogTemplate={timestamp:new Date,level:i.LOG_LEVEL[i.LOG_LEVEL.trace],message:"",component:e,machine:s,tags:o,data:{},trace_id:n,span_id:t,processing_time:0}}trace(e,t,n=0){this.objLogTemplate.level=i.LOG_LEVEL[i.LOG_LEVEL.trace],this.objLogTemplate.processing_time=n,this.sendLog(e,t)}debug(e,t,n=0){this.objLogTemplate.level=i.LOG_LEVEL[i.LOG_LEVEL.debug],this.objLogTemplate.processing_time=n,this.sendLog(e,t)}info(e,t,n=0){this.objLogTemplate.level=i.LOG_LEVEL[i.LOG_LEVEL.info],this.objLogTemplate.processing_time=n,this.sendLog(e,t)}warn(e,t,n=0){this.objLogTemplate.level=i.LOG_LEVEL[i.LOG_LEVEL.warn],this.objLogTemplate.processing_time=n,this.sendLog(e,t)}fatal(e,t,n=0){this.objLogTemplate.level=i.LOG_LEVEL[i.LOG_LEVEL.fatal],this.objLogTemplate.processing_time=n,this.sendLog(e,t)}error(e,t,n=0){this.objLogTemplate.level=i.LOG_LEVEL[i.LOG_LEVEL.error],this.objLogTemplate.processing_time=n,this.sendLog(e,t)}sendLog(e,t){if(!1!==this.bSendLog&&(this.objLogTemplate.timestamp=new Date,this.objLogTemplate.message=e,this.objLogTemplate.data=t,this.logObj=this.objLogTemplate,"TRANSPORT_CONSOLE"===this.strTransport)){let e=i.LOG_LEVEL[this.objLogTemplate.level];if(e>=this.nBaseLevel)switch(e){case i.LOG_LEVEL.fatal:case i.LOG_LEVEL.error:console.error(JSON.stringify(this.objLogTemplate));break;case i.LOG_LEVEL.warn:console.warn(JSON.stringify(this.objLogTemplate));break;case i.LOG_LEVEL.info:console.info(JSON.stringify(this.objLogTemplate));break;case i.LOG_LEVEL.debug:console.debug(JSON.stringify(this.objLogTemplate));break;case i.LOG_LEVEL.trace:console.trace(JSON.stringify(this.objLogTemplate));break;default:console.log(JSON.stringify(this.objLogTemplate))}}}readConfig(){this.strTransport=process.env.LOG_TRANSPORT||"TRANSPORT_CONSOLE";let e=process.env.LOG_BASE_LEVEL||"info";this.nBaseLevel=i.LOG_LEVEL[e],this.bSendLog=/(true|1|t|yes|y)/i.test(process.env.LOG_SEND||"true")}setTraceId(e){this.objLogTemplate.trace_id=e}}t.Logger=a},function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.handler=t.sftp=void 0;const s=o(n(0)),r=o(n(1)),i=n(5),a=n(6),c=new(n(3).Logger)("sftpLambda",s.default.gen(!1),s.default.gen(!1),["common","api","sftpLambda"],r.default());t.sftp=new class{constructor(){this.gateway=new a.Sftp,this.s3Client=new i.S3}},t.handler=async e=>{let n;c.info("sftpLambda invoked",{event:e});try{const o={Bucket:e.Records[0].s3.bucket.name,Key:e.Records[0].s3.object.key};c.debug("showing parameter",o);const s=await t.sftp.s3Client.getObject(o).createReadStream(),r=o.Key.split("/"),i=await t.sftp.gateway.send(s,r[r.length-1]);c.info("Status of File published by SftpOutboundGateway to external server is : ",{result:i}),n=!0}catch(e){c.error("Error found in sftp Lambda ",{error:e}),n=!1}return n}},function(e,t){e.exports=require("aws-sdk")},function(e,t,n){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Sftp=void 0;const s=n(7),r=o(n(0)),i=o(n(1));n(2).config();const a=n(3);t.Sftp=class{constructor(){this.client=new s,this.connectionString={host:process.env.SFTP_HOST,port:process.env.SFTP_PORT,username:process.env.SFTP_USER_NAME,privateKey:process.env.SFTP_PRIVATE_KEY},this.initializeLogger(),this.logger.info(this.constructor.name+" invoked",null)}initializeLogger(){this.logger=new a.Logger(this.constructor.name,r.default.gen(!1),r.default.gen(!1),["SFTP","OBSERVATIONS"],i.default())}async send(e,t){return this.nStartProcessingTime=(new Date).valueOf(),this.logger.info(this.constructor.name+"."+this.send.name+" invoked",this.dataLogger,(new Date).valueOf()-this.nStartProcessingTime),this.dataLogger={destination:t},this.logger.info("Recieved publish request",this.dataLogger,(new Date).valueOf()-this.nStartProcessingTime),new Promise(((n,o)=>{if(!e||t.length<1)this.logger.error("s3FileStreamContent or Destination name can not be null or empty",this.dataLogger,(new Date).valueOf()-this.nStartProcessingTime),n(!1);else{const s=String(process.env.SFTP_PATH)+t;this.client.connect(this.connectionString).then((()=>(this.logger.info("SFTP connection successful! ",this.dataLogger,(new Date).valueOf()-this.nStartProcessingTime),this.client.put(e,s)))).then((()=>{this.client.end(),this.logger.info("SFTP Publish successful! ",this.dataLogger,(new Date).valueOf()-this.nStartProcessingTime),n(!0)})).catch((e=>{this.logger.error("Failed to publish file on SFTP server! Got error : "+JSON.stringify(e),this.dataLogger,(new Date).valueOf()-this.nStartProcessingTime),o(!1)}))}}))}}},function(e,t){e.exports=require("ssh2-sftp-client")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LOG_LEVEL=void 0,function(e){e[e.trace=0]="trace",e[e.debug=1]="debug",e[e.info=2]="info",e[e.warn=3]="warn",e[e.error=4]="error",e[e.fatal=5]="fatal"}(t.LOG_LEVEL||(t.LOG_LEVEL={}))}]));