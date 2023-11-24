import React from 'react'

interface IReadOnly {
    name: string;
    value: number | string | null;
}

const ReadOnly = (props: IReadOnly) => (
    <input type="text" id={props.name} name={props.name} value={props.value || '-'} readOnly className="" />
)

export default ReadOnly