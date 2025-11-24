const ToolTwo = {
  template: `
    <div id="Tool-2" class="tool-container">
      <label class="upload-label">
        📁 Upload Your Custom Image
        <input type="file" @change="uploadImage" accept="image/*" class="upload-input" />
      </label>
      <div id="editor_container" class="editor-box"></div>
    </div>
  `,
  data() {
    return {
      filerobotImageEditor: null,
    };
  },
  methods: {
    getEditorConfig(source) {
      const { TABS, TOOLS } = window.FilerobotImageEditor;

      return {
        source,
        onSave: (editedImageObject, designState) => {
          console.log('Saved Image:', editedImageObject, designState);

          const a = document.createElement('a');
          a.href = editedImageObject.imageBase64;
          a.download = 'edited-image.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        annotationsCommon: {
          fill: '#ff0000',
        },
        Text: { text: 'Filerobot...' },
        Rotate: { angle: 90, componentType: 'slider' },
        translations: {
          profile: 'Profile',
          coverPhoto: 'Cover photo',
          facebook: 'Facebook',
          socialMedia: 'Social Media',
          fbProfileSize: '180x180px',
          fbCoverPhotoSize: '820x312px',
        },
        Crop: {
          presetsItems: [
            { titleKey: 'classicTv', descriptionKey: '4:3', ratio: 4 / 3 },
            { titleKey: 'cinemascope', descriptionKey: '21:9', ratio: 21 / 9 },
          ],
          presetsFolders: [
            {
              titleKey: 'socialMedia',
              groups: [
                {
                  titleKey: 'facebook',
                  items: [
                    { titleKey: 'profile', width: 180, height: 180, descriptionKey: 'fbProfileSize' },
                    { titleKey: 'coverPhoto', width: 820, height: 312, descriptionKey: 'fbCoverPhotoSize' },
                  ],
                },
              ],
            },
          ],
        },
        tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK],
        defaultTabId: TABS.ANNOTATE,
        defaultToolId: TOOLS.TEXT,
      };
    },

    uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target.result;

        if (this.filerobotImageEditor) {
          this.filerobotImageEditor.terminate();
        }

        this.filerobotImageEditor = new window.FilerobotImageEditor(
          this.$el.querySelector('#editor_container'),
          this.getEditorConfig(imageBase64)
        );

        this.filerobotImageEditor.render({
          onClose: (reason) => {
            console.log('Editor closed:', reason);
            this.filerobotImageEditor.terminate();
          },
        });
      };

      reader.readAsDataURL(file);
    },
  },
  mounted() {
    const defaultImage = 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg';
    this.filerobotImageEditor = new window.FilerobotImageEditor(
      this.$el.querySelector('#editor_container'),
      this.getEditorConfig(defaultImage)
    );

    this.filerobotImageEditor.render({
      onClose: (reason) => {
        console.log('Editor closed:', reason);
        this.filerobotImageEditor.terminate();
      },
    });
  },
};
