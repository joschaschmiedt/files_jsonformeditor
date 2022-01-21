/**
 * ownCloud - Files_JsonFormEditor
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Tom Needham <tom@owncloud.com>
 * @copyright Tom Needham 2015
 */

import { SidebarPreview } from './sidebarpreview'
import { JsonFormEditor } from './editor'
import { newFileMenuPlugin } from './newfileplugin'

// convince webpack to load chunks
__webpack_require__.p = OC.filePath('files_jsonformeditor', 'js', '../build/')
const script = document.querySelector('[nonce]')
__webpack_require__.nc = script['nonce'] || script.getAttribute('nonce')

OCA.Files_JsonFormEditor = JsonFormEditor

OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin)
OC.Plugins.register('OCA.Files.SidebarPreviewManager', new SidebarPreview())

$(document).ready(function () {
  $('#editor').remove()
  OCA.Files_JsonFormEditor.initialize(
    $('<div id="app-content-jsonformeditor"></div>')
  )
})
