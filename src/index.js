import widgetController from './widget/widget.controller.js';
import widgetTemplate from './widget/widget.template.html';

import settingsController from './settings/settings.controller.js';
import settingsTemplate from './settings/settings.template.html';

import defaultPresets from './presets';

export default (options) => {
    
    options = options || {};

    let presets = options.presets || defaultPresets;

    return {
        widgetController,
        widgetTemplate,
        settingsController,
        settingsTemplate,
        presets,
    };
};
