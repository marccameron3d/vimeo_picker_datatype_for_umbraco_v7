using Newtonsoft.Json;
using System;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace ourUmbraco.VimeoPicker.PropertyValueConverters
{
    [PropertyValueType(typeof(VimeoPicker))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
    public class VimeoPickerValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("vp.VimeoPicker");
        }

        public override object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return null;
            var sourceString = source.ToString();

            try
            {
                return JsonConvert.DeserializeObject<VimeoPicker>(sourceString);
            }
            catch (Exception ex)
            {
                return sourceString;
            }
        }
    }
}
