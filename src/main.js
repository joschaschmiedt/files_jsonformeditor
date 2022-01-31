/* eslint-disable @nextcloud/no-deprecations */
/* eslint-disable no-tabs */

// eslint-disable-next-line node/no-extraneous-import
import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import '@jsonforms/vue2-vanilla/vanilla.css'
// eslint-disable-next-line node/no-extraneous-import
import { translate as t, translatePlural as n } from '@nextcloud/l10n'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)
// Adding translations to the whole app
Vue.mixin({
	methods: {
		t,
		n,
	},
})

$('#app-content').append('<div id=jsonformeditor></div>')

OCA.Files_JsonFormEditor = new Vue({
	render: h => h(App),
})

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
