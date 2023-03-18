import { makeStyles } from "@material-ui/core";

const useSearchUserPositionStyles = makeStyles({
    contentSearchBox: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        background: 'red',
        borderRadius: '50px',
        padding: '6px',
        "&:hover": {
            "& $inputStyle": {
                width: 280,
                padding: 5,
                margin: '0 10px 0 5px',
            },
            "& $Autocomplete": {
                opacity: 1,
                pointerEvents: 'auto'
            }
        },
        "&:focus-within": {
            "& $inputStyle": {
                width: 280,
                padding: 5,
                margin: '0 10px 0 5px',
            },
            "& $Autocomplete": {
                opacity: 1,
                pointerEvents: 'auto'
            }
        },
    },

    Autocomplete: {
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.4s ease-out',
    },

    root: {
        color: '#000',
        "& span": {
            "& svg": {
                color: '#000',
            }
        },
    },

    content: {
        position: 'relative'
    },

    contentClearIcon: {
        position: 'absolute',
        top: '50%',
        right: '12%',
        transform: 'translateY(-50%)'
    },

    clearIndicator: {
        display: 'none'
    },

    inputStyle: {
        background: 'white',
        color: '#000',
        outline: 'none',
        border: 'none',
        fontSize: '20px',
        borderRadius: '10px',
        padding: 0,
        margin: 0,
        width: 0,
        transition: 'width 0.4s ease-out, padding 0.4s ease-out, margin 0.4s ease-out',
    },

    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderRadius: '50%'
    }
})

export { useSearchUserPositionStyles };
