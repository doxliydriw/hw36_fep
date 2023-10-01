import Entry from "../components/Entry";
import {useMemo, useState} from 'react';

function EntryList(props) {
    const sortedList = useMemo(() => {
        return props.dbResult.sort(function (a, b) {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        });
    }, [props.dbResult]);

    
    return (
            <>
                {!props.dbResult.length && <p>No entries</p>}
                {props.dbResult.length > 0 &&
                    <>
                        <h1>List of entries</h1>
                        <div className="list">
                    {sortedList.map((entry) => (<Entry
                        deleteTarget={props.deleteTarget}
                        entry={entry}
                        key={sortedList.indexOf(entry) + 1}
                        deleteEntry={props.deleteEntry}
                        listId={sortedList.indexOf(entry) + 1}
                        setOpenModal={() => { setOpenModal }} />))}
                </div>
            </>
                }
            </>
        )
}

export default EntryList