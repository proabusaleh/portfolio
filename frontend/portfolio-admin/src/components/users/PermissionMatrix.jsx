import { Fragment } from 'react';
import { ROLES, PERMISSION_GROUPS, ROLE_PERMISSIONS } from '../../data/usersData';

export default function PermissionMatrix() {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-sm font-semibold mb-4">Role Permissions</h3>
      <p className="text-xs text-gray-500 mb-6">Overview of what each role can access</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-2 pr-4 font-medium text-gray-500">Permission</th>
              {ROLES.map((r) => (
                <th key={r.id} className="text-center py-2 px-3 font-medium text-gray-500">{r.icon} {r.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(PERMISSION_GROUPS).map(([groupKey, group]) => (
              <Fragment key={groupKey}>
                <tr>
                  <td colSpan={ROLES.length + 1} className="pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{group.group}</td>
                </tr>
                {group.permissions.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800/50">
                    <td className="py-2 pr-4 text-xs text-gray-600 dark:text-gray-400">{p.label}</td>
                    {ROLES.map((r) => {
                      const perms = ROLE_PERMISSIONS[r.id] || [];
                      return (
                        <td key={r.id} className="text-center py-2 px-3">
                          {perms.includes('*') || perms.includes(p.id) ? (
                            <span className="text-green-500 text-lg">&#10003;</span>
                          ) : (
                            <span className="text-gray-300 dark:text-gray-700 text-lg">&mdash;</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
