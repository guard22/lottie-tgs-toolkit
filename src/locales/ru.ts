export default {
  nav: {
    home: 'Главная',
    batchConvert: 'Массовая конвертация',
    editor: 'Редактор',
    about: 'О проекте'
  },
  home: {
    title: 'Lottie TGS Toolkit',
    subtitle: 'Конвертируйте стикеры Telegram в анимации Lottie',
    description: 'Профессиональный инструмент для конвертации TGS файлов в формат JSON и редактирования анимаций Lottie',
    features: {
      convert: {
        title: 'Конвертация TGS в JSON',
        description: 'Конвертируйте файлы стикеров Telegram в формат Lottie JSON с высоким качеством'
      },
      batch: {
        title: 'Пакетная обработка',
        description: 'Обрабатывайте множество файлов одновременно для максимальной эффективности'
      },
      edit: {
        title: 'Редактор временной шкалы',
        description: 'Редактируйте анимации с профессиональными инструментами временной шкалы'
      }
    },
    cta: {
      convert: 'Начать конвертацию',
      batch: 'Массовая конвертация',
      edit: 'Открыть редактор'
    }
  },
  batchConvert: {
    title: 'Массовая конвертация',
    description: 'Конвертируйте целые папки с .tgs файлами в формат JSON одним кликом. Идеально подходит для обработки больших коллекций стикеров.',
    help: {
      selectFolder: {
        title: 'Выберите папку',
        description: 'Перетащите папку с .tgs файлами или нажмите для выбора'
      },
      fastProcessing: {
        title: 'Быстрая обработка',
        description: 'Все файлы обрабатываются параллельно для максимальной скорости'
      },
      zipArchive: {
        title: 'ZIP архив',
        description: 'Получите все конвертированные файлы в удобном ZIP архиве'
      }
    }
  },
  batchConverter: {
    title: 'Массовая конвертация TGS → JSON',
    dropArea: 'Перетащите папку с .tgs файлами сюда или нажмите для выбора',
    filesFound: 'Найдено файлов',
    buttons: {
      convertAll: 'Конвертировать все',
      converting: 'Конвертация...',
      downloadZip: 'Скачать ZIP архив',
      clear: 'Очистить'
    },
    errors: {
      conversionError: 'Ошибка конвертации',
      zipError: 'Ошибка создания ZIP архива',
      zipErrorAlert: 'Ошибка при создании ZIP архива'
    }
  },
  timelineEditor: {
    title: 'Timeline Editor',
    subtitle: 'Редактор временной шкалы анимации',
    animationInfo: {
      title: 'Информация об анимации',
      name: 'Название',
      size: 'Размер',
      fps: 'FPS',
      duration: 'Длительность',
      layers: 'Слоев',
      frames: 'кадров',
      untitled: 'Без названия'
    },
    animationSettings: {
      title: 'Настройки анимации',
      animationName: 'Название анимации',
      fpsLabel: 'FPS (кадров в секунду)',
      startFrame: 'Начальный кадр',
      endFrame: 'Конечный кадр'
    },
    layersPanel: {
      title: 'Слои анимации',
      layer: 'Слой',
      startFrame: 'Начало (кадр)',
      endFrame: 'Конец (кадр)',
      duration: 'Длительность'
    },
    quickActions: {
      title: 'Быстрые действия',
      reset: 'Сбросить изменения',
      duplicate: 'Дублировать слой',
      delete: 'Удалить слой',
      optimize: 'Оптимизировать'
    },
    messages: {
      resetConfirm: 'Вы уверены, что хотите сбросить все изменения?',
      deleteConfirm: 'Вы уверены, что хотите удалить этот слой?',
      optimized: 'Анимация оптимизирована!'
    }
  },
  preview: {
    title: 'Анимация',
    export: 'Экспорт анимации',
    saveAsTgs: 'Сохранить как TGS',
    saveAsJson: 'Сохранить как JSON'
  },
  fileDrop: {
    title: 'Конвертер TGS в JSON',
    subtitle: 'Конвертируйте стикеры Telegram в формат Lottie',
    dragDrop: 'Перетащите TGS или JSON файл сюда или нажмите для выбора!',
    or: 'или',
    browse: 'Выберите файлы',
    supportedFormats: 'Поддерживаемые форматы: .tgs',
    processing: 'Обработка...',
    error: 'Ошибка обработки файла',
    success: 'Файл успешно конвертирован!'
  },
  info: {
    whatIsTgs: {
      title: 'Что такое TGS?',
      description: 'TGS - это формат анимированных стикеров Telegram, основанный на Lottie. Наш конвертер позволяет извлечь JSON данные для редактирования.'
    },
    fastProcessing: {
      title: 'Быстрая обработка',
      description: 'Конвертация происходит мгновенно в вашем браузере. Никаких загрузок на сервер - ваши файлы остаются приватными.'
    },
    editing: {
      title: 'Редактирование',
      description: 'После конвертации вы можете редактировать анимации, изменять цвета, скорость и другие параметры.'
    }
  },
  about: {
    description: 'Это проект с открытым исходным кодом для конвертации стикеров Telegram (TGS) в формат Lottie JSON. Создан с использованием Vue 3, TypeScript и современных веб-технологий.'
  },
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    save: 'Сохранить',
    delete: 'Удалить',
    edit: 'Редактировать',
    close: 'Закрыть'
  }
};