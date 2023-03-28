import Tag from "antd/lib/tag";
import {TweenOneGroup} from "rc-tween-one";
import {PlusOutlined} from '@ant-design/icons';

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Input from "antd/lib/input";

export const SeoTag = ({field, ...props}) => {
    //------------- FOR SEO TAG COMPONENT-------------------------
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isVisibleAddNewTag, setIsVisibleAddNewTag] = useState<boolean>(true);
    const handleClose = (removedTag) => {
        const tempTags = tags.filter((tag) => tag !== removedTag);
        setTags(tempTags);
        props.onConfirm({field: field, value: tempTags});
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const value = props?.value ? props?.value.split(',') : [];
        setTags(value);
    }, [props.value]);

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            if (tags.length < 20) {
                setTags([...tags, inputValue]);
                if (tags.length == 19) {
                    //Add max 20 tags
                    setIsVisibleAddNewTag(false);
                }
                props.onConfirm({field: field, value: [...tags, inputValue]});
            }
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{display: 'inline-block'}}>
                {tagElem}
            </span>
        );
    };
    const input = useRef<any>();
    useLayoutEffect(() => {
        inputVisible && input.current.focus();
    });
    //-------------END FOR SEO TAG COMPONENT-------------------------


    return (
        <>
            {tags?.length > 0 && (
                <div style={{marginBottom: '10px'}}>
                    <TweenOneGroup
                        enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                        }}
                        onEnd={(e: any) => {
                            if (e.type === 'appear' || e.type === 'enter') {
                                e.target.style = 'display: inline-block';
                            }
                        }}
                        leave={{
                            opacity: 0,
                            width: 0,
                            scale: 0,
                            duration: 200,
                        }}
                        appear={false}
                    >
                        {tags.map(forMap)}
                    </TweenOneGroup>
                </div>
            )}
            {isVisibleAddNewTag && (
                <div>
                    {inputVisible && (
                        <Input
                            ref={input}
                            type="text"
                            size="small"
                            style={{width: 78}}
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag onClick={showInput} className="site-tag-plus">
                            <PlusOutlined/> New Tag
                        </Tag>
                    )}
                </div>
            )}
        </>
    )

}

export default SeoTag
