export const newFileMenuPlugin = {
  attach: function (menu) {
    var fileList = menu.fileList

    // Make text app handle new file creation if enabled
    if (typeof OCA.Text !== 'undefined') {
      return
    }

    // only attach to main file list, public view is not supported yet
    if (fileList.id !== 'files') {
      return
    }

    // register the new menu entry
    menu.addMenuEntry({
      id: 'file',
      displayName: 'New JSON form file',
      templateName: 'form.json',
      iconClass: 'icon-filetype-text',
      fileType: 'file',
      actionHandler: function (name) {
        var dir = fileList.getCurrentDirectory()
        // first create the file
        fileList.createFile(name).then(function () {
          // once the file got successfully created,
          // open the editor
          OCA.Files_JsonFormEditor._onEditorTrigger(name, {
            fileList: fileList,
            dir: dir,
          })
        })
      },
    })
  },
}
