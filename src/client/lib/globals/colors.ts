
enum Theme {
    Primary       = 'primary',
    DarkPrimary   = 'dark-primary',
    LightPrimary  = 'light-primary',
    Accent        = 'accent',
    Divider       = 'divider',
}

enum Text {
    Text          = 'text',
    SecondaryText = 'text-secondary',
}

enum Standard {
    Red       = 'red',
    Purple    = 'purple',
    Indigo    = 'indigo',
    Blue      = 'blue',
    LightBlue = 'light-blue',
    Cyan      = 'cyan',
    Teal      = 'teal',
    Green     = 'green',
    Yellow    = 'yellow',
    Orange    = 'orange',
    Brown     = 'brown',
    Gray      = 'gray',
    BlueGray  = 'blue-gray',
}

type Color = Theme | Standard | Text;

export {
    Color,
    Theme as ThemeColor,
    Text as TextColor,
    Standard as StandardColor,
};
