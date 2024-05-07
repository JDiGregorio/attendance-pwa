import { TPermission } from '../types'

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

const routes = (permissions: TPermission) => {
    return [
        {
            canSee: true,
            path: '/home',
            icon: 'HomeIcon',
            name: 'Inicio',
            current: true
        },{
            canSee: true,
            path: '/sessions',
            icon: 'CalendarDaysIcon',
            name: 'Sesiones',
            current: true
        },{
            canSee: permissions.createBeneficiary,
            path: '/beneficiaries',
            icon: 'UsersIcon',
            name: 'Beneficiarios',
            current: false
        },
        {
            canSee: permissions.createReport,
            path: '/reports',
            icon: 'ClipboardDocumentListIcon',
            name: 'Reportes de Actividad',
            current: false
        }
    ]
}

export default routes