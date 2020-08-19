<script>
import { startsWith } from '@dword-design/functions'

export default {
  functional: true,
  props: {
    activeClass: String,
    append: Boolean,
    ariaCurrentValue: {
      default: 'page',
      type: String,
    },
    exact: Boolean,
    exactActiveClass: String,
    noTranslate: { type: Boolean },
    replace: Boolean,
    tag: {
      default: 'a',
      type: String,
    },
    to: { required: true, type: [String, Object] },
  },
  render: context => {
    const translatedTo = context.props.noTranslate
      ? context.props.to
      : context.parent.localePath(context.props.to)
    const current = context.parent.$route
    const resolved = context.parent.$router.resolve(
      translatedTo,
      current,
      context.props.append
    )
    const classes = {}
    const activeClass =
      context.props.activeClass ||
      context.parent.$router.options.linkActiveClass ||
      'router-link-active'
    const exactActiveClass =
      context.props.exactActiveClass ||
      context.parent.$router.options.linkExactActiveClass ||
      'router-link-exact-active'
    classes[exactActiveClass] = resolved.href === context.parent.$route.path
    classes[activeClass] = context.props.exact
      ? classes[exactActiveClass]
      : context.parent.$route.path |> startsWith(resolved.href)
    const ariaCurrentValue = classes[exactActiveClass]
      ? context.props.ariaCurrentValue
      : undefined
    return (
      <a
        {...context.data}
        aria-current={ariaCurrentValue}
        class={classes}
        href={resolved.href}
      >
        {context.scopedSlots.default?.({
          href: resolved.href,
          isActive: classes[activeClass],
          isExactActive: classes[exactActiveClass],
          route: resolved.route,
        })}
      </a>
    )
  },
}
</script>
