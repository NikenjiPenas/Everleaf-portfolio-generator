@if(($demo ?? false) && !($embedded ?? false))
<div class="toolbar">
    <a href="{{ route('home') }}#templates">← Back to templates</a>
    <span class="preview-label">Example · {{ $templateLabel }} design</span>
    <a class="demo-use" href="{{ route('register', ['template' => $template]) }}">Use this design →</a>
</div>
@elseif (!(($public ?? false) || ($embedded ?? false)))
<div class="toolbar">
    <a class="back" href="{{ route('portfolios.index') }}">← My portfolios</a>
    <span class="preview-label">Previewing {{ $templateLabel ?? ($template === 'minimal' ? 'Simple' : ucfirst($template)) }}</span>
    <form method="POST" action="{{ route('portfolios.template.update', $portfolio) }}">
        @csrf
        <input type="hidden" name="template_key" value="{{ $template }}">
        <button type="submit">{{ $portfolio->template_key === $template ? 'Selected' : 'Use this design' }}</button>
    </form>
</div>
@if (session('success'))<div class="template-notice" role="status">{{ session('success') }}</div>@endif
@endif
