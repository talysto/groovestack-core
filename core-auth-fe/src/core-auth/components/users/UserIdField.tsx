import { Chip } from '@mui/material'
import { useRecordContext } from 'react-admin'
import { AvatarLabel } from '../shared/AvatarLabel'

export const UserIdField = ({
  titleField = 'name',
  subTitleField = 'email',
}) => {
  const record = useRecordContext()
  if (!record) return null

  const image = record.avatar_image[0]?.[0] // smallest

  return record ? (
    <AvatarLabel
      preTitle={
        record.roles && record.roles.length > 0 ? (
          <>
            {record.roles.map((role, idx) => (
              <Chip size="small" label={role} key={idx} />
            ))}
          </>
        ) : (
          false
        )
      }
      title={record[titleField]}
      subTitle={record[subTitleField]}
      image={image}
    />
  ) : (
    <AvatarLabel isLoading />
  )
}
UserIdField.defaultProps = { label: 'User', source: 'id' }
