
function _isNil(obj: any) {
    return (obj === null) || (obj === undefined);
}

function _isNotNil(obj: any) {
    return !((obj === null) || (obj === undefined));
}

export const Util = {
    isNil: _isNil,
    isNotNil: _isNotNil,
};
