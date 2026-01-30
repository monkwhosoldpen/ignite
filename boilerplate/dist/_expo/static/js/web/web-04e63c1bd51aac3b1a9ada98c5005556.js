__d(function(g,r,i,a,m,e,d){var n=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.getFCMToken=async function(n){if("undefined"==typeof window)return null;s||await u();if(!s)return console.error("Firebase messaging not initialized"),null;try{const t=c||await navigator.serviceWorker.getRegistration();t||console.warn("Service worker not registered. Register firebase-messaging-sw.js first.");const o=await(0,r(d[3]).getToken)(s,{vapidKey:n,serviceWorkerRegistration:t||void 0});return o?{token:o,platform:"web"}:(console.warn("No FCM token received"),null)}catch(n){return console.error("Failed to get FCM token for web:",n),null}},e.initializeFirebaseWeb=u,e.onForegroundMessage=async function(n){s||await u();if(!s)return console.error("Firebase messaging not initialized"),()=>{};return(0,r(d[3]).onMessage)(s,n)},e.requestPermissions=async function(){if("undefined"==typeof window)return!1;if(!("Notification"in window))return console.warn("This browser does not support notifications"),!1;try{return"granted"===await Notification.requestPermission()}catch(n){return console.error("Failed to request notification permission:",n),!1}};var t=n(r(d[1]));let o=null,s=null,c=null;async function l(){if("undefined"==typeof window||!("serviceWorker"in navigator))return null;try{const n=await navigator.serviceWorker.register("/firebase-messaging-sw.js");return console.log("Firebase messaging service worker registered:",n.scope),n}catch(n){return console.error("Failed to register Firebase messaging service worker:",n),null}}async function u(){"undefined"!=typeof window&&(0===(0,r(d[2]).getApps)().length?(o=(0,r(d[2]).initializeApp)(t.default.FIREBASE_WEB_CONFIG),s=(0,r(d[3]).getMessaging)(o)):(o=(0,r(d[2]).getApps)()[0],s=(0,r(d[3]).getMessaging)(o)),c=await l())}},1150,[5,157,947,1151]);
__d(function(g,r,i,a,m,e,d){Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(r(d[0])).forEach(function(n){"default"!==n&&"__esModule"!==n&&(n in e&&e[n]===r(d[0])[n]||Object.defineProperty(e,n,{enumerable:!0,get:function(){return r(d[0])[n]}}))})},1151,[1152]);
__d(function(g,r,_i,a,m,_e,d){'use strict';Object.defineProperty(_e,'__esModule',{value:!0}),r(d[0]);
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const e='BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4',t='google.c.a.c_id';var n,i;
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function o(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')}function s(e){const t=(e+'='.repeat((4-e.length%4)%4)).replace(/\-/g,'+').replace(/_/g,'/'),n=atob(t),i=new Uint8Array(n.length);for(let e=0;e<n.length;++e)i[e]=n.charCodeAt(e);return i}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */!(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(n||(n={})),(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(i||(i={}));const c='fcm_token_details_db',p='fcm_token_object_Store';async function u(e){if('databases'in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(c))return null}let t=null;return(await r(d[1]).openDB(c,5,{upgrade:async(n,i,s,c)=>{if(i<2)return;if(!n.objectStoreNames.contains(p))return;const u=c.objectStore(p),f=await u.index('fcmSenderId').get(e);if(await u.clear(),f)if(2===i){const e=f;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:'string'==typeof e.vapidKey?e.vapidKey:o(e.vapidKey)}}}else if(3===i){const e=f;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:o(e.auth),p256dh:o(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:o(e.vapidKey)}}}else if(4===i){const e=f;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:o(e.auth),p256dh:o(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:o(e.vapidKey)}}}}})).close(),await r(d[1]).deleteDB(c),await r(d[1]).deleteDB('fcm_vapid_details_db'),await r(d[1]).deleteDB('undefined'),f(t)?t:null}function f(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return'number'==typeof e.createTime&&e.createTime>0&&'string'==typeof e.token&&e.token.length>0&&'string'==typeof t.auth&&t.auth.length>0&&'string'==typeof t.p256dh&&t.p256dh.length>0&&'string'==typeof t.endpoint&&t.endpoint.length>0&&'string'==typeof t.swScope&&t.swScope.length>0&&'string'==typeof t.vapidKey&&t.vapidKey.length>0}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const l='firebase-messaging-store';let w=null;function h(){return w||(w=r(d[1]).openDB("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(l)}})),w}async function b(e){const t=k(e),n=await h(),i=await n.transaction(l).objectStore(l).get(t);if(i)return i;{const t=await u(e.appConfig.senderId);if(t)return await y(e,t),t}}async function y(e,t){const n=k(e),i=(await h()).transaction(l,'readwrite');return await i.objectStore(l).put(t,n),await i.done,t}async function v(e){const t=k(e),n=(await h()).transaction(l,'readwrite');await n.objectStore(l).delete(t),await n.done}function k({appConfig:e}){return e.appId}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const I={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":'This method is available in a Window context.',"only-available-in-sw":'This method is available in a service worker context.',"permission-default":'The notification permission was not granted and dismissed instead.',"permission-blocked":'The notification permission was not granted and blocked instead.',"unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":'We are unable to register the default service worker. {$browserErrorMessage}',"token-subscribe-failed":'A problem occurred while subscribing the user to FCM: {$errorInfo}',"token-subscribe-no-token":'FCM returned no token when subscribing the user to push.',"token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":'A problem occurred while updating the user from FCM: {$errorInfo}',"token-update-no-token":'FCM returned no token when updating the user to push.',"use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":'The input to useServiceWorker() must be a ServiceWorkerRegistration.',"invalid-bg-handler":'The input to setBackgroundMessageHandler() must be a function.',"invalid-vapid-key":'The public VAPID key must be a string.',"use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},T=new(r(d[2]).ErrorFactory)('messaging','Messaging',I);
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function S(e,t){const n=await C(e),i=K(t),o={method:'POST',headers:n,body:JSON.stringify(i)};let s;try{const t=await fetch(M(e.appConfig),o);s=await t.json()}catch(e){throw T.create("token-subscribe-failed",{errorInfo:e?.toString()})}if(s.error){const e=s.error.message;throw T.create("token-subscribe-failed",{errorInfo:e})}if(!s.token)throw T.create("token-subscribe-no-token");return s.token}async function _(e,t){const n=await C(e),i=K(t.subscriptionOptions),o={method:'PATCH',headers:n,body:JSON.stringify(i)};let s;try{const n=await fetch(`${M(e.appConfig)}/${t.token}`,o);s=await n.json()}catch(e){throw T.create("token-update-failed",{errorInfo:e?.toString()})}if(s.error){const e=s.error.message;throw T.create("token-update-failed",{errorInfo:e})}if(!s.token)throw T.create("token-update-no-token");return s.token}async function D(e,t){const n={method:'DELETE',headers:await C(e)};try{const i=await fetch(`${M(e.appConfig)}/${t}`,n),o=await i.json();if(o.error){const e=o.error.message;throw T.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw T.create("token-unsubscribe-failed",{errorInfo:e?.toString()})}}function M({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function C({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({'Content-Type':'application/json',Accept:'application/json','x-goog-api-key':e.apiKey,'x-goog-firebase-installations-auth':`FIS ${n}`})}function K({p256dh:t,auth:n,endpoint:i,vapidKey:o}){const s={web:{endpoint:i,auth:n,p256dh:t}};return o!==e&&(s.web.applicationPubKey=o),s}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function A(e){const t=await j(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:o(t.getKey('auth')),p256dh:o(t.getKey('p256dh'))},i=await b(e.firebaseDependencies);if(i){if(N(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?E(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await D(e.firebaseDependencies,i.token)}catch(e){console.warn(e)}return P(e.firebaseDependencies,n)}return P(e.firebaseDependencies,n)}async function O(e){const t=await b(e.firebaseDependencies);t&&(await D(e.firebaseDependencies,t.token),await v(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}async function E(e,t){try{const n=await _(e.firebaseDependencies,t),i={...t,token:n,createTime:Date.now()};return await y(e.firebaseDependencies,i),n}catch(e){throw e}}async function P(e,t){const n={token:await S(e,t),createTime:Date.now(),subscriptionOptions:t};return await y(e,n),n.token}async function j(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:s(t)})}function N(e,t){const n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,o=t.auth===e.auth,s=t.p256dh===e.p256dh;return n&&i&&o&&s}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function R(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return x(t,e),F(t,e),H(t,e),t}function x(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const o=t.notification.image;o&&(e.notification.image=o);const s=t.notification.icon;s&&(e.notification.icon=s)}function F(e,t){t.data&&(e.data=t.data)}function H(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const i=t.fcmOptions?.analytics_label;i&&(e.fcmOptions.analyticsLabel=i)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function B(e){if(!e||!e.options)throw W('App Configuration Object');if(!e.name)throw W('App Name');const t=['projectId','apiKey','appId','messagingSenderId'],{options:n}=e;for(const e of t)if(!n[e])throw W(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function W(e){return T.create("missing-app-config-values",{valueName:e})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
!(function(e,t){const n=[];for(let i=0;i<e.length;i++)n.push(e.charAt(i)),i<t.length&&n.push(t.charAt(i));n.join('')})('AzSCbw63g1R0nCw85jG8','Iaya3yLKwmgvh7cF0q4');class L{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=B(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function $(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{}),await V(e.swRegistration)}catch(e){throw T.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function V(e){return new Promise((t,n)=>{const i=setTimeout(()=>n(new Error("Service worker not registered after 10000 ms")),1e4),o=e.installing||e.waiting;e.active?(clearTimeout(i),t()):o?o.onstatechange=e=>{'activated'===e.target?.state&&(o.onstatechange=null,clearTimeout(i),t())}:(clearTimeout(i),n(new Error('No incoming service worker found.')))})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function U(e,t){if(t||e.swRegistration||await $(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw T.create("invalid-sw-registration");e.swRegistration=t}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function q(t,n){n?t.vapidKey=n:t.vapidKey||(t.vapidKey=e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function G(e,t){if(!navigator)throw T.create("only-available-in-window");if('default'===Notification.permission&&await Notification.requestPermission(),'granted'!==Notification.permission)throw T.create("permission-blocked");return await q(e,t?.vapidKey),await U(e,t?.serviceWorkerRegistration),A(e)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function z(e,n,i){const o=J(n);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(o,{message_id:i[t],message_name:i["google.c.a.c_l"],message_time:i["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}function J(e){switch(e){case i.NOTIFICATION_CLICKED:return'notification_open';case i.PUSH_RECEIVED:return'notification_foreground';default:throw new Error}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Y(e,n){const o=n.data;if(!o.isFirebaseMessaging)return;e.onMessageHandler&&o.messageType===i.PUSH_RECEIVED&&('function'==typeof e.onMessageHandler?e.onMessageHandler(R(o)):e.onMessageHandler.next(R(o)));const s=o.data;var c;'object'==typeof(c=s)&&c&&t in c&&'1'===s["google.c.a.e"]&&await z(e,o.messageType,s)}const Q="@firebase/messaging",X="0.12.23",Z=e=>{const t=new L(e.getProvider('app').getImmediate(),e.getProvider('installations-internal').getImmediate(),e.getProvider('analytics-internal'));return navigator.serviceWorker.addEventListener('message',e=>Y(t,e)),t},ee=e=>{const t=e.getProvider('messaging').getImmediate();return{getToken:e=>G(t,e)}};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function te(){try{await r(d[2]).validateIndexedDBOpenable()}catch(e){return!1}return'undefined'!=typeof window&&r(d[2]).isIndexedDBAvailable()&&r(d[2]).areCookiesEnabled()&&'serviceWorker'in navigator&&'PushManager'in window&&'Notification'in window&&'fetch'in window&&ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification')&&PushSubscription.prototype.hasOwnProperty('getKey')}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function ne(e){if(!navigator)throw T.create("only-available-in-window");return e.swRegistration||await $(e),O(e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ie(e,t){if(!navigator)throw T.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */r(d[3])._registerComponent(new(r(d[4]).Component)('messaging',Z,"PUBLIC")),r(d[3])._registerComponent(new(r(d[4]).Component)('messaging-internal',ee,"PRIVATE")),r(d[3]).registerVersion(Q,X),r(d[3]).registerVersion(Q,X,'cjs2020'),_e.deleteToken=function(e){return ne(e=r(d[2]).getModularInstance(e))},_e.getMessaging=function(e=r(d[3]).getApp()){return te().then(e=>{if(!e)throw T.create("unsupported-browser")},e=>{throw T.create("indexed-db-unsupported")}),r(d[3])._getProvider(r(d[2]).getModularInstance(e),'messaging').getImmediate()},_e.getToken=async function(e,t){return G(e=r(d[2]).getModularInstance(e),t)},_e.isSupported=te,_e.onMessage=function(e,t){return ie(e=r(d[2]).getModularInstance(e),t)}},1152,[1153,953,950,948,952]);
__d(function(g,r,i,a,m,_e,d){'use strict';Object.defineProperty(_e,'__esModule',{value:!0});const t="@firebase/installations",e="0.6.19",n=`w:${e}`,o='FIS_v2',s={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":'Firebase Installation is not registered.',"installation-not-found":'Firebase Installation not found.',"request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":'Could not process request. Application offline.',"delete-pending-registration":"Can't delete installation while there is a pending registration request."},u=new(r(d[0]).ErrorFactory)('installations','Installations',s);function c(t){return t instanceof r(d[0]).FirebaseError&&t.code.includes("request-failed")}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function f({projectId:t}){return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function p(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace('s','000'))),creationTime:Date.now()};var e}async function l(t,e){const n=(await e.json()).error;return u.create("request-failed",{requestName:t,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function w({apiKey:t}){return new Headers({'Content-Type':'application/json',Accept:'application/json','x-goog-api-key':t})}function h(t,{refreshToken:e}){const n=w(t);return n.append('Authorization',C(e)),n}async function y(t){const e=await t();return e.status>=500&&e.status<600?t():e}function C(t){return`${o} ${t}`}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function S({appConfig:t,heartbeatServiceProvider:e},{fid:s}){const u=f(t),c=w(t),h=e.getImmediate({optional:!0});if(h){const t=await h.getHeartbeatsHeader();t&&c.append('x-firebase-client',t)}const C={fid:s,authVersion:o,appId:t.appId,sdkVersion:n},S={method:'POST',headers:c,body:JSON.stringify(C)},v=await y(()=>fetch(u,S));if(v.ok){const t=await v.json();return{fid:t.fid||s,registrationStatus:2,refreshToken:t.refreshToken,authToken:p(t.authToken)}}throw await l('Create Installation',v)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function v(t){return new Promise(e=>{setTimeout(e,t)})}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const I=/^[cdef][\w-]{21}$/;function T(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const e=k(t);return I.test(e)?e:""}catch{return""}}function k(t){var e;return(e=t,btoa(String.fromCharCode(...e)).replace(/\+/g,'-').replace(/\//g,'_')).substr(0,22)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function b(t){return`${t.appName}!${t.appId}`}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const P=new Map;function q(t,e){const n=b(t);E(n,e),D(n,e)}function j(t,e){A();const n=b(t);let o=P.get(n);o||(o=new Set,P.set(n,o)),o.add(e)}function $(t,e){const n=b(t),o=P.get(n);o&&(o.delete(e),0===o.size&&P.delete(n),N())}function E(t,e){const n=P.get(t);if(n)for(const t of n)t(e)}function D(t,e){const n=A();n&&n.postMessage({key:t,fid:e}),N()}let _=null;function A(){return!_&&'BroadcastChannel'in self&&(_=new BroadcastChannel('[Firebase] FID Change'),_.onmessage=t=>{E(t.data.key,t.data.fid)}),_}function N(){0===P.size&&_&&(_.close(),_=null)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const F='firebase-installations-store';let V=null;function x(){return V||(V=r(d[1]).openDB("firebase-installations-database",1,{upgrade:(t,e)=>{if(0===e)t.createObjectStore(F)}})),V}async function M(t,e){const n=b(t),o=(await x()).transaction(F,'readwrite'),s=o.objectStore(F),u=await s.get(n);return await s.put(e,n),await o.done,u&&u.fid===e.fid||q(t,e.fid),e}async function O(t){const e=b(t),n=(await x()).transaction(F,'readwrite');await n.objectStore(F).delete(e),await n.done}async function H(t,e){const n=b(t),o=(await x()).transaction(F,'readwrite'),s=o.objectStore(F),u=await s.get(n),c=e(u);return void 0===c?await s.delete(n):await s.put(c,n),await o.done,!c||u&&u.fid===c.fid||q(t,c.fid),c}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function L(t){let e;const n=await H(t.appConfig,n=>{const o=B(n),s=K(t,o);return e=s.registrationPromise,s.installationEntry});return""===n.fid?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function B(t){return U(t||{fid:T(),registrationStatus:0})}function K(t,e){if(0===e.registrationStatus){if(!navigator.onLine){return{installationEntry:e,registrationPromise:Promise.reject(u.create("app-offline"))}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:z(t,n)}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:J(t)}:{installationEntry:e}}async function z(t,e){try{const n=await S(t,e);return M(t.appConfig,n)}catch(n){throw c(n)&&409===n.customData.serverCode?await O(t.appConfig):await M(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function J(t){let e=await R(t.appConfig);for(;1===e.registrationStatus;)await v(100),e=await R(t.appConfig);if(0===e.registrationStatus){const{installationEntry:e,registrationPromise:n}=await L(t);return n||e}return e}function R(t){return H(t,t=>{if(!t)throw u.create("installation-not-found");return U(t)})}function U(t){return 1===(e=t).registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}async function G({appConfig:t,heartbeatServiceProvider:e},o){const s=Q(t,o),u=h(t,o),c=e.getImmediate({optional:!0});if(c){const t=await c.getHeartbeatsHeader();t&&u.append('x-firebase-client',t)}const f={installation:{sdkVersion:n,appId:t.appId}},w={method:'POST',headers:u,body:JSON.stringify(f)},C=await y(()=>fetch(s,w));if(C.ok){return p(await C.json())}throw await l('Generate Auth Token',C)}function Q(t,{fid:e}){return`${f(t)}/${e}/authTokens:generate`}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function W(t,e=!1){let n;const o=await H(t.appConfig,o=>{if(!tt(o))throw u.create("not-registered");const s=o.authToken;if(!e&&et(s))return o;if(1===s.requestStatus)return n=X(t,e),o;{if(!navigator.onLine)throw u.create("app-offline");const e=at(o);return n=Z(t,e),e}});return n?await n:o.authToken}async function X(t,e){let n=await Y(t.appConfig);for(;1===n.authToken.requestStatus;)await v(100),n=await Y(t.appConfig);const o=n.authToken;return 0===o.requestStatus?W(t,e):o}function Y(t){return H(t,t=>{if(!tt(t))throw u.create("not-registered");const e=t.authToken;return 1===(n=e).requestStatus&&n.requestTime+1e4<Date.now()?{...t,authToken:{requestStatus:0}}:t;var n;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */})}async function Z(t,e){try{const n=await G(t,e),o={...e,authToken:n};return await M(t.appConfig,o),n}catch(n){if(!c(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...e,authToken:{requestStatus:0}};await M(t.appConfig,n)}else await O(t.appConfig);throw n}}function tt(t){return void 0!==t&&2===t.registrationStatus}function et(t){return 2===t.requestStatus&&!nt(t)}function nt(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+36e5}function at(t){return{...t,authToken:{requestStatus:1,requestTime:Date.now()}}}async function it(t){const e=t,{installationEntry:n,registrationPromise:o}=await L(e);return o?o.catch(console.error):W(e).catch(console.error),n.fid}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function rt(t,e=!1){const n=t;await ot(n);return(await W(n,e)).token}async function ot(t){const{registrationPromise:e}=await L(t);e&&await e}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function st(t,e){const n=ut(t,e),o={method:'DELETE',headers:h(t,e)},s=await y(()=>fetch(n,o));if(!s.ok)throw await l('Delete Installation',s)}function ut(t,{fid:e}){return`${f(t)}/${e}`}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function ct(t){if(!t||!t.options)throw ft('App Configuration');if(!t.name)throw ft('App Name');const e=['projectId','apiKey','appId'];for(const n of e)if(!t.options[n])throw ft(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function ft(t){return u.create("missing-app-config-values",{valueName:t})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const pt='installations',lt=t=>{const e=t.getProvider('app').getImmediate();return{app:e,appConfig:ct(e),heartbeatServiceProvider:r(d[2])._getProvider(e,'heartbeat'),_delete:()=>Promise.resolve()}},dt=t=>{const e=t.getProvider('app').getImmediate(),n=r(d[2])._getProvider(e,pt).getImmediate();return{getId:()=>it(n),getToken:t=>rt(n,t)}};r(d[2])._registerComponent(new(r(d[3]).Component)(pt,lt,"PUBLIC")),r(d[2])._registerComponent(new(r(d[3]).Component)("installations-internal",dt,"PRIVATE")),r(d[2]).registerVersion(t,e),r(d[2]).registerVersion(t,e,'cjs2020'),_e.deleteInstallations=async function(t){const{appConfig:e}=t,n=await H(e,t=>{if(!t||0!==t.registrationStatus)return t});if(n){if(1===n.registrationStatus)throw u.create("delete-pending-registration");if(2===n.registrationStatus){if(!navigator.onLine)throw u.create("app-offline");await st(e,n),await O(e)}}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */,_e.getId=it,_e.getInstallations=
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(t=r(d[2]).getApp()){return r(d[2])._getProvider(t,'installations').getImmediate()},_e.getToken=rt,_e.onIdChange=function(t,e){const{appConfig:n}=t;return j(n,e),()=>{$(n,e)}}},1153,[950,953,948,952]);