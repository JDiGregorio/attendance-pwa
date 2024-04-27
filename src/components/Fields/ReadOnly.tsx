import React from 'react'

interface IReadOnly {
    name: string;
    value: number | string | null;
}

const ReadOnly: React.FC<IReadOnly> = (props) => (
    <input type='text' id={props.name} name={props.name} value={props.value || ""} readOnly className="block w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-gray-50 border-gray-300 focus:border-gray-200 focus:ring-0 dark:text-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700" />
)

export default ReadOnly