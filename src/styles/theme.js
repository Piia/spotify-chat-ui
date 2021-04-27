const ROOT = 16;

const colors = {
    black: '#000000',
    white: '#FFFFFF',
    outerSpace: '#2E3131',
    vista: '#a9dfbf',
    goblin: '#3C5142',
    varden: '#FDEFD3',
    leather: '#906A54',
    voodoo: '#40333E',
    cosmic: '#794D60',
    strikemaster: '#946A81',
    magnolia: '#F8F4FF',
};

const font = {
    family: {
        arial: 'Arial, Helvetica, sans-serif',
        georgia: 'Georgia,Times,Times New Roman,serif',
        verdana: 'Verdana,Geneva,sans-serif',
    },
    size: {
        xxs: 0.3 * ROOT + 'px',
        xs: 0.5 * ROOT + 'px',
        sm: 0.75 * ROOT + 'px',
        md: ROOT + 'px',
        lg: 1.5 * ROOT + 'px',
        xl: 2 * ROOT + 'px',
        xxl: 3 * ROOT + 'px',
    },
    weight: {
        normal: 400,
        bold: 700,
    },
};

const spacing = {
    xxs: 0.25 * ROOT + 'px',
    xs: 0.5 * ROOT + 'px',
    sm: 0.75 * ROOT + 'px',
    md: ROOT + 'px',
    lg: 1.5 * ROOT + 'px',
    xl: 2 * ROOT + 'px',
    xxl: 3 * ROOT + 'px',
};

export const theme = {
    colors,
    font,
    spacing,
};
