import useAlert from 'shared/ui/Alert/use-alert';

const useDefibrillatorAlert = () => {
    const [, ShowAlert] = useAlert();

    const showDevicesAlert = () =>
        ShowAlert({
            open: true,
            severity: 'error',
            message: 'Пристроїв поблизу не виявлено'
        });

    const showPositionAlert = () =>
        ShowAlert({
            open: true,
            severity: 'error',
            message: 'Позиція користувача не знайдена'
        });

    const showChangePositionAlert = () =>
        ShowAlert({
            open: true,
            severity: 'error',
            message: 'Введіть ваше місцезнаходження'
        });

    return {
        showDevicesAlert,
        showPositionAlert,
        showChangePositionAlert
    };
};

export { useDefibrillatorAlert };
