/**
 * Nextcloud - Files_JsonFormEditor
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Joscha Schmiedt <joscha.schmiedt@gmail.com>
 * @copyright Joscha Schmiedt 2015
 */
/// <reference types="@nextcloud/typings" />
declare var OC: Nextcloud.v21.OC | Nextcloud.v22.OC | Nextcloud.v23.OC;
declare var OCA: any;
/// <reference types="@types/webpack" />


// import { SidebarPreview } from './sidebarpreview'
import { JsonFormEditor } from './editor'
import { newFileMenuPlugin } from './newfileplugin'

// @ts-ignore
__webpack_require__.p = OC.filePath('files_jsonformeditor', 'js', '../js/')
const script = document.querySelector('[nonce]')
// @ts-ignore
__webpack_require__.nc = script['nonce'] || script.getAttribute('nonce')

OCA.Files_JsonFormEditor = JsonFormEditor

// @ts-ignore
OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin)


$(document).ready(function () {
  $('#editor').remove()
  OCA.Files_JsonFormEditor.initialize(
    $('<div id="app-content-jsonformeditor"></div>')
  )
})
