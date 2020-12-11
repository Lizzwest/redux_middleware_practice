const TextInput = (props) =>
    <input
      style={{minWidth: '20vh', maxWidth: '30vh', height: '28px', margin: '0 0 -5px 0', outline: 'none'}}
      type='text'
      value={props.value}
      onChange={(e) => props.onChange(e)}
      placeholder={props.placeholder}
    />
export default TextInput