import React, { ReactNode, useState } from 'react';
interface SearchListProps {
    items: any[]
    classes: string
    onChange: (item: any) => void
}

export const SearchList: React.FC<SearchListProps> = ({ items, classes, onChange }) => {
    const [searchPhrase, setSearchPhrase]= useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsInputFocused(false);
        },500)
    };
  return (
    <>
        <div className='relative'>
            <input value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} style={{width: '300px',zIndex: 4}} onFocus={handleInputFocus}
            onBlur={handleInputBlur} className={classes} id='search'></input>
            { isInputFocused && 
            <div className='modal-content overflow-y-scroll absolute' style={{zIndex:5,top: '100%',maxHeight: '200px',width: '300px'}} id='options'>
            {items.map((item) => {
                if(item.name.includes(searchPhrase))
                {
                    return(
                    <div className='cursor-pointer' onClick={() => {onChange(item),setSearchPhrase(item.name)}}>
                    {item.name}
                    </div>)
                }
            })}
            </div>
            }
        </div>
    </>
  )
}
 