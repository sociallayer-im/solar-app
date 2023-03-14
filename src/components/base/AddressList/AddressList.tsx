import usePicture from '../../../hooks/pictrue'
import './AddressList.less'
import { Group, Profile } from "../../../service/solas";

interface AddressListProp {
    data: Array<Group | Profile>,
    selected?: Array<string>
    onClick?: (domain: string) => any
}
function AddressList({ selected = [], ...props }: AddressListProp) {
    const { defaultAvatar } = usePicture()

    return (<div className='address-list'>
        {
            props.data.map((item,index) => {
                return <div className='list-item'
                            key={ index }
                            onClick={() => { !!props.onClick && props.onClick(item.domain!)} }>
                    <div className='left'>
                        <img src={item.image_url || defaultAvatar(item.id) } alt=""/>
                        <span>{item.domain}</span>
                    </div>
                    { (selected?.indexOf(item.domain!)) != -1 ? <i className='icon icon-selected'></i> : false }
                </div>
            })
        }
    </div>)
}

export default AddressList