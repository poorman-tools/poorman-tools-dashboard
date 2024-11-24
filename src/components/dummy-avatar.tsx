export function DummyAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1080 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter
          id="filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="linearRGB"
        >
          {" "}
          <feMorphology
            operator="dilate"
            radius="20 20"
            in="SourceAlpha"
            result="morphology"
          />
          <feFlood flood-color="#ffffff" flood-opacity="1" result="flood" />
          <feComposite
            in="flood"
            in2="morphology"
            operator="in"
            result="composite"
          />
          <feMerge result="merge">
            {" "}
            <feMergeNode in="composite" result="mergeNode" />
            <feMergeNode in="SourceGraphic" result="mergeNode1" />{" "}
          </feMerge>{" "}
        </filter>
      </defs>
      <g id="notion-avatar" filter="url(#filter)">
        {" "}
        <g id="notion-avatar-face" fill="#ffffff">
          <title>Face/ 4</title>
          <g
            id="Face/-4"
            stroke="none"
            stroke-width="1"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M532,379 C664.54834,379 772,486.45166 772,619 C772,751.54834 764.54834,899 592,899 C462.715227,899 358.747776,816.220491 314.739381,718.954345 C313.831676,718.98455 312.917642,719 312,719 C267.81722,719 232,683.18278 232,639 C232,599.134956 261.158843,566.080325 299.312086,560.00055 C325.599297,455.979213 419.809919,379 532,379 Z M295.858895,624.545187 L304.141105,655.454813"
              id="Path"
              stroke="#000000"
              stroke-width="24"
            />{" "}
          </g>{" "}
        </g>
        <g id="notion-avatar-nose">
          {" "}
          <title>Nose/ 7</title>{" "}
          <g
            id="Nose/-7"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path
              d="M649,600 C669,606.666667 679,620 679,640 C679,660 669,673.333333 649,680"
              id="Path"
              stroke="#000000"
              stroke-width="16"
            />{" "}
          </g>{" "}
        </g>
        <g id="notion-avatar-mouth">
          {" "}
          <title>Mouth/ 4</title>{" "}
          <g
            id="Mouth/-4"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M549,778 C580.121822,764.84962 604.121822,756.516287 621,753 C637.878178,749.483713 661.878178,747.817046 693,748"
              id="Path"
              stroke="#000000"
              stroke-width="16"
            />{" "}
          </g>{" "}
        </g>
        <g id="notion-avatar-eyes">
          <title>Eyes/ 9</title>{" "}
          <g
            id="Eyes/-9"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              d="M570,507 C575.854822,507 581.122051,511.025253 584.779642,517.440484 L578,531 L589.369946,531.000208 C589.781247,533.557105 590,536.237678 590,539 C590,556.673112 581.045695,571 570,571 C558.954305,571 550,556.673112 550,539 C550,521.326888 558.954305,507 570,507 Z M708,507 C713.854822,507 719.122051,511.025253 722.779642,517.440484 L716,531 L727.369946,531.000208 C727.781247,533.557105 728,536.237678 728,539 C728,556.673112 719.045695,571 708,571 C696.954305,571 688,556.673112 688,539 C688,521.326888 696.954305,507 708,507 Z"
              id="Combined-Shape"
              fill="#000000"
            />{" "}
          </g>{" "}
        </g>
        <g id="notion-avatar-eyebrows">
          {" "}
          <g id="Eyebrows/ 12">
            <g id="Group">
              <path
                id="Path"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M681 505.316C681 505.316 698.641 492.863 706.392 490.578C714.144 488.294 738 489.316 738 489.316L755 494.913C755 494.913 730.25 494.897 716.549 497.08C702.848 499.263 681 505.316 681 505.316Z"
                fill="black"
                stroke="black"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Path_2"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M597 505.316C597 505.316 579.359 492.863 571.608 490.578C563.856 488.294 540 489.316 540 489.316L523 494.913C523 494.913 547.75 494.897 561.451 497.08C575.152 499.263 597 505.316 597 505.316Z"
                fill="black"
                stroke="black"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>{" "}
        </g>
        <g id="notion-avatar-glasses">
          {" "}
          <title>Glasses/ 0</title>{" "}
          <g
            id="Glasses/-0"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          />{" "}
        </g>
        <g id="notion-avatar-hair">
          {" "}
          <g id="Hairstyle/ 40">
            <path
              id="Path"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M639 277.308C667.43 286.446 696 298 704 336C710.842 368.499 711 378 689 446C682.333 430.667 649.333 422 590 420C561.16 419.028 528.044 403.964 495 406C470.467 407.511 431.899 420.685 379.296 445.522L380.068 448.707C388.266 482.685 392.365 505.363 392.365 516.739C392.365 527.77 384.591 569.192 369.044 641.005L366 655L328.117 564.825H287.146C271.78 507.747 268.106 468.653 276.123 447.542C284.14 426.431 296.099 411.251 312 402C331 367 470.357 328.33 494.118 324.238C495.772 323.953 497.385 323.709 498.959 323.505L500.461 322.624C508.552 317.838 513.95 313.985 519.924 310.186C492.292 313.158 451.984 326.133 399.002 349.111C446.763 317.858 490.246 301.828 529.453 301.02C531.82 300.971 534.136 300.973 536.402 301.026C538.424 300.055 540.611 299.049 543 298C548.899 295.41 556.081 293.379 564.106 291.94C536.526 289.839 492.546 297.699 432.166 315.521C483.379 290.323 528.492 279.711 567.505 283.687C577.797 284.736 587.013 286.631 595.151 289.371C618.568 289.36 644.007 293.263 664.64 301.589C657.176 294.844 648.63 289.751 639 286.308C613.258 277.105 566.925 275.105 500 280.308C555.333 266.308 601.667 265.308 639 277.308Z"
              fill="black"
              stroke="black"
              stroke-width="12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>{" "}
        </g>
        <g id="notion-avatar-accessories">
          {" "}
          <title>Accessories/ 0</title>{" "}
          <g
            id="Accessories/-0"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          />{" "}
        </g>
        <g id="notion-avatar-details">
          {" "}
          <title>Details/ 0</title>{" "}
          <g
            id="Details/-0"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          />{" "}
        </g>
        <g id="notion-avatar-beard">
          {" "}
          <title>Beard/ 0</title>{" "}
          <g
            id="Beard/-0"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          />{" "}
        </g>{" "}
      </g>{" "}
    </svg>
  );
}
