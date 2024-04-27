/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

const routes = () => {
    return [
        {
            canSee: true,
            path: '/sessions',
            icon: 'CalendarDaysIcon',
            name: 'Sesiones',
            current: true
        },{
            canSee: true,
            path: '/beneficiaries',
            icon: 'UsersIcon',
            name: 'Beneficiarios',
            current: false
        },
        {
            canSee: true,
            path: '/reports',
            icon: 'ClipboardDocumentListIcon',
            name: 'Reportes de Actividad',
            current: false
        }
    ]
}

export default routes