import { Logger } from 'tslog';
import { DateTime } from 'luxon';
import { getUserMovementsByPocketId } from '../common/database/controllers/movement.controller';
import { IDashboardRequest } from '../common/models/dasboardRequest.model';

const logger: Logger = new Logger();

export const getUserResumeInformationManager = async (dasboardFilter: IDashboardRequest) => {
    try {
        //Validar que exista el usuario y que los pockets sean de el
        const { pocketId, userId } = dasboardFilter;
        const dates = getDateRangeByFilterType(dasboardFilter);
        const movements = await getUserMovementsByPocketId(userId, pocketId, dates);
        return {
            code: '0000',
            description: 'successful',
            movements
        }
    } catch (error) {
        logger.info(error);
        throw new Error(error.message);
    }
}

const getDateRangeByFilterType = (dasboardFilter: IDashboardRequest) => {

    let initialDate: Date;
    let finalDate: Date;
    const timeZome = 'America/Bogota';
    const dateNowString = DateTime.now()
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).setZone(timeZome).toISO();
    const dateNow = DateTime.fromISO(dateNowString, { zone: 'utc' });

    if ('CUSTOM' === dasboardFilter.filterType.toString()) {
        initialDate = dasboardFilter.initialDate;
        finalDate = dasboardFilter.finalDate
    }
    if ('THIS_MONTH' === dasboardFilter.filterType.toString()) {
        initialDate = dateNow.set({ day: 1 }).toJSDate();
        finalDate = dateNow.toJSDate();
    }
    if ('THIS_WEEK' === dasboardFilter.filterType.toString()) {
        initialDate = dateNow.startOf('week').toJSDate(); //Lun - Dom
        finalDate = dateNow.toJSDate();
    }
    if ('FIRST_15TH_CURRENT_MONTH' === dasboardFilter.filterType.toString()) {
        initialDate = dateNow.set({ day: 1 }).toJSDate();
        finalDate = dateNow.set({ day: 15 }).toJSDate();
        console.log({ finalDate, initialDate })
    }
    if ('SECOND_15TH_CURRENT_MONTH' === dasboardFilter.filterType.toString()) {
        initialDate = dateNow.set({ day: 15 }).toJSDate();
        finalDate = dateNow.endOf('month').toJSDate();
    }

    return { initialDate, finalDate };
}