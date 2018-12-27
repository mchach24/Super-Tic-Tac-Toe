
import { Color } from '@lib/globals/colors';
import { Util }  from '@lib/util/util';
import React     from 'react';
import Icons     from './icons';

/* tslint:disable max-line-length */

// INTERFACES

interface IconProps {
    icon: Icons;
    color?: Color;
    className?: string;
}

export class Icon extends React.Component<IconProps> {

    // CONSTRUCTOR

    constructor(props) {
        super(props);
    }

    // PUBLIC METHODS

    public render() {

        let className = 'icon';

        const props = this.props;

        if (Util.isNotNil(props.className)) {
            className += props.className;
        }

        if (Util.isNotNil(props.color)) {
            className += ` color-${props.color}`;
        }

        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={ className }>
                { this.getSVG() }
            </svg>
        );
    }

    // PRIVATE METHODS

    private getSVG(): React.ReactFragment {

        let svgContents;

        switch (this.props.icon) {
            case Icons.ArrowDown:
                svgContents = <React.Fragment>
                    <line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>
                </React.Fragment>;
                break;
            case Icons.ArrowLeft:
                svgContents = <React.Fragment>
                    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
                </React.Fragment>;
                break;
            case Icons.ArrowRight:
                svgContents = <React.Fragment>
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                </React.Fragment>;
                break;
            case Icons.ArrowUp:
                svgContents = <React.Fragment>
                    <line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>
                </React.Fragment>;
                break;
            case Icons.Bell:
                svgContents = <React.Fragment>
                    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                </React.Fragment>;
                break;
            case Icons.Check:
                svgContents = <React.Fragment>
                    <polyline points="20 6 9 17 4 12"></polyline>
                </React.Fragment>;
                break;
            case Icons.ChevronDown:
                svgContents = <React.Fragment>
                    <polyline points="6 9 12 15 18 9"></polyline>
                </React.Fragment>;
                break;
            case Icons.ChevronLeft:
                svgContents = <React.Fragment>
                    <polyline points="15 18 9 12 15 6"></polyline>
                </React.Fragment>;
                break;
            case Icons.ChevronRight:
                svgContents = <React.Fragment>
                    <polyline points="9 18 15 12 9 6"></polyline>
                </React.Fragment>;
                break;
            case Icons.ChevronUp:
                svgContents = <React.Fragment>
                    <polyline points="18 15 12 9 6 15"></polyline>
                </React.Fragment>;
                break;
            case Icons.Clipboard:
                svgContents = <React.Fragment>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </React.Fragment>;
                break;
            case Icons.Clock:
                svgContents = <React.Fragment>
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                </React.Fragment>;
                break;
            case Icons.Close:
                svgContents = <React.Fragment>
                    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </React.Fragment>;
                break;
            case Icons.CloseSquare:
                svgContents = <React.Fragment>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>
                </React.Fragment>;
                break;
            case Icons.Flag:
                svgContents = <React.Fragment>
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>
                </React.Fragment>;
                break;
            case Icons.Github:
                svgContents = <React.Fragment>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </React.Fragment>;
                break;
            case Icons.Info:
                svgContents = <React.Fragment>
                    <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line>
                </React.Fragment>;
                break;
            case Icons.LogIn:
                svgContents = <React.Fragment>
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>
                </React.Fragment>;
                break;
            case Icons.LogOut:
                svgContents = <React.Fragment>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                </React.Fragment>;
                break;
            case Icons.Menu:
                svgContents = <React.Fragment>
                    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                </React.Fragment>;
                break;
            case Icons.Message:
                svgContents = <React.Fragment>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </React.Fragment>;
                break;
            case Icons.Minus:
                svgContents = <React.Fragment>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </React.Fragment>;
                break;
            case Icons.MinusCircle:
                svgContents = <React.Fragment>
                    <circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>
                </React.Fragment>;
                break;
            case Icons.MoreHorizontal:
                svgContents = <React.Fragment>
                    <circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>
                </React.Fragment>;
                break;
            case Icons.MoreVertical:
                svgContents = <React.Fragment>
                    <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>
                </React.Fragment>;
                break;
            case Icons.Options:
                svgContents = <React.Fragment>
                    <line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>
                </React.Fragment>;
                break;
            case Icons.Play:
                svgContents = <React.Fragment>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </React.Fragment>;
                break;
            case Icons.PlayCircle:
                svgContents = <React.Fragment>
                    <circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>
                </React.Fragment>;
                break;
            case Icons.Plus:
                svgContents = <React.Fragment>
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                </React.Fragment>;
                break;
            case Icons.PlusCircle:
                svgContents = <React.Fragment>
                    <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
                </React.Fragment>;
                break;
            case Icons.Refresh:
                svgContents = <React.Fragment>
                    <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </React.Fragment>;
                break;
            case Icons.User:
                svgContents = <React.Fragment>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </React.Fragment>;
                break;
            default:
                throw Error("Icon prop not properly specified: check Icons enum");
        }

        return svgContents;
    }
}
