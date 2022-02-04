/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable @nextcloud/no-deprecations */
/* eslint-disable no-tabs */

// eslint-disable-next-line node/no-extraneous-import
import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import '@jsonforms/vue2-vanilla/vanilla.css'
// eslint-disable-next-line node/no-extraneous-import
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import { generateFilePath } from '@nextcloud/router'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
// Adding translations to the whole app
Vue.mixin({
	methods: {
		t,
		n,
	},
})

// convince webpack to load chunks
__webpack_require__.p = OC.filePath('files_texteditor', 'js', '../js/')
const script = document.querySelector('[nonce]')
__webpack_require__.nc = script.nonce || script.getAttribute('nonce')
__webpack_public_path__ = generateFilePath(appName, '', 'js/')

// eslint-disable-next-line camelcase
__webpack_nonce__ = btoa(OC.requestToken)

$('#app-content').append('<div id=jsonformeditor></div>')

OCA.Files_JsonFormEditor = new Vue({
	render: h => h(App),
})
// const View = Vue.extend(App)
// new View().$mount('#jsonformeditor')

OCA.Files.fileActions.registerAction({
	name: 'edit_jsonformeditor',
	displayName: t(
		'files_jsonformeditor',
		'Edit in JSON forms text editor',
	),
	mime: 'application/json',
	filename: 'metadata.json',
	actionHandler: () => { OCA.Files_JsonFormEditor.$mount('#jsonformeditor') },
	permissions: OC.PERMISSION_READ,
	iconClass: 'icon-edit',
	type: OCA.Files.FileActions.TYPE_DROPDOWN, //
})
