export default {
  nav: {
    home: 'Home',
    batchConvert: 'Batch Convert',
    editor: 'Editor',
    about: 'About'
  },
  home: {
    title: 'Lottie TGS Toolkit',
    subtitle: 'Convert Telegram stickers to Lottie animations',
    description: 'Professional tool for converting TGS files to JSON format and editing Lottie animations',
    features: {
      convert: {
        title: 'Convert TGS to JSON',
        description: 'Convert Telegram sticker files to Lottie JSON format with high quality'
      },
      batch: {
        title: 'Batch Processing',
        description: 'Process multiple files at once for maximum efficiency'
      },
      edit: {
        title: 'Timeline Editor',
        description: 'Edit animations with professional timeline tools'
      }
    },
    cta: {
      convert: 'Start Converting',
      batch: 'Batch Convert',
      edit: 'Open Editor'
    }
  },
  batchConvert: {
    title: 'Batch Conversion',
    description: 'Convert entire folders of .tgs files to JSON format with one click. Perfect for processing large sticker collections.',
    help: {
      selectFolder: {
        title: 'Select Folder',
        description: 'Drag and drop a folder with .tgs files or click to select'
      },
      fastProcessing: {
        title: 'Fast Processing',
        description: 'All files are processed in parallel for maximum speed'
      },
      zipArchive: {
        title: 'ZIP Archive',
        description: 'Get all converted files in a convenient ZIP archive'
      }
    }
  },
  batchConverter: {
    title: 'TGS to JSON Batch Conversion',
    dropArea: 'Drag and drop a folder with .tgs files here or click to select',
    filesFound: 'Files found',
    buttons: {
      convertAll: 'Convert All',
      converting: 'Converting...',
      downloadZip: 'Download ZIP Archive',
      clear: 'Clear'
    },
    errors: {
      conversionError: 'Conversion error',
      zipError: 'Error creating ZIP archive',
      zipErrorAlert: 'Error creating ZIP archive'
    }
  },
  timelineEditor: {
    title: 'Timeline Editor',
    subtitle: 'Animation timeline editor',
    animationInfo: {
      title: 'Animation Information',
      name: 'Name',
      size: 'Size',
      fps: 'FPS',
      duration: 'Duration',
      layers: 'Layers',
      frames: 'frames',
      untitled: 'Untitled'
    },
    animationSettings: {
      title: 'Animation Settings',
      animationName: 'Animation Name',
      fpsLabel: 'FPS (frames per second)',
      startFrame: 'Start Frame',
      endFrame: 'End Frame'
    },
    layersPanel: {
      title: 'Animation Layers',
      layer: 'Layer',
      startFrame: 'Start (frame)',
      endFrame: 'End (frame)',
      duration: 'Duration'
    },
    quickActions: {
      title: 'Quick Actions',
      reset: 'Reset Changes',
      duplicate: 'Duplicate Layer',
      delete: 'Delete Layer',
      optimize: 'Optimize'
    },
    messages: {
      resetConfirm: 'Are you sure you want to reset all changes?',
      deleteConfirm: 'Are you sure you want to delete this layer?',
      optimized: 'Animation optimized!'
    }
  },
  preview: {
    title: 'Animation',
    export: 'Export animation',
    saveAsTgs: 'Save as TGS',
    saveAsJson: 'Save as JSON'
  },
  fileDrop: {
    title: 'TGS to JSON Converter',
    subtitle: 'Convert Telegram stickers to Lottie format',
    dragDrop: 'Drop a TGS or JSON file here or click to select one manually!',
    or: 'or',
    browse: 'Browse Files',
    supportedFormats: 'Supported formats: .tgs',
    processing: 'Processing...',
    error: 'Error processing file',
    success: 'File converted successfully!'
  },
  info: {
    whatIsTgs: {
      title: 'What is TGS?',
      description: 'TGS is Telegram\'s animated sticker format based on Lottie. Our converter allows you to extract JSON data for editing.'
    },
    fastProcessing: {
      title: 'Fast Processing',
      description: 'Conversion happens instantly in your browser. No server uploads - your files remain private.'
    },
    editing: {
      title: 'Editing',
      description: 'After conversion, you can edit animations, change colors, speed and other parameters.'
    }
  },
  about: {
    description: 'This is an open-source project for converting Telegram stickers (TGS) to Lottie JSON format. Built with Vue 3, TypeScript, and modern web technologies.',
    project: {
      title: '🚀 Project Information',
      description: 'Lottie TGS Toolkit is a professional web application that provides powerful tools for working with Telegram animated stickers.',
      openSource: 'This project is completely open source and available on GitHub.',
      github: 'View on GitHub',
      author: 'Created by guard22'
    },
    features: {
      title: '✨ Key Features',
      items: [
        'Convert TGS files to Lottie JSON format',
        'Batch processing for multiple files',
        'Professional timeline editor',
        'Real-time animation preview',
        'Multilingual interface (English/Russian)',
        'No server uploads - everything works in your browser'
      ]
    },
    tech: {
      title: '🛠️ Technologies Used',
      items: [
        'Vue 3 with Composition API',
        'TypeScript for type safety',
        'Vue Router for navigation',
        'Vuex for state management',
        'Vue I18n for internationalization',
        'Lottie Web for animations',
        'Modern CSS with custom properties'
      ]
    },
    links: {
      title: '🔗 Useful Links',
      github: 'GitHub Repository',
      issues: 'Report Issues',
      contribute: 'Contribute to Project'
    }
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close'
  }
};