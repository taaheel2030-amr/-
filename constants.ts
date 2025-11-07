
import { User, Job, Article, Comment, CommentUser } from './types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'فاطمة الأحمد',
    avatarUrl: 'https://picsum.photos/seed/fatima/200',
    headline: 'أخصائية جودة وسلامة غذاء | حاصلة على شهادة HACCP',
    location: 'الرياض, المملكة العربية السعودية',
    email: 'fatima.admin@example.com',
    phone: '+966501234567',
    password: 'adminpassword',
    role: 'admin',
    permissions: ['manage_users', 'manage_jobs', 'manage_articles'],
    about: 'أخصائية جودة أغذية بخبرة تزيد عن 8 سنوات في تطوير وتطبيق أنظمة سلامة الغذاء. متخصصة في تحليل المخاطر ونقاط التحكم الحرجة (HACCP) ومعايير ISO 22000. أسعى لتطبيق أفضل الممارسات لضمان أعلى معايير الجودة في صناعة الأغذية.',
    experience: [
      { id: 1, title: 'مدير جودة', company: 'شركة المراعي', duration: '2018 - حتى الآن', description: 'مسؤولة عن فريق الجودة وضمان الامتثال للمعايير المحلية والدولية.' },
      { id: 2, title: 'مشرف سلامة غذاء', company: 'شركة نادك', duration: '2015 - 2018', description: 'تطوير وتنفيذ خطط HACCP وإجراء عمليات التدقيق الداخلي.' },
    ],
    education: [
      { id: 1, degree: 'ماجستير في علوم الأغذية', school: 'جامعة الملك سعود', duration: '2012 - 2014' },
      { id: 2, degree: 'بكالوريوس في التغذية', school: 'جامعة الأميرة نورة', duration: '2008 - 2012' },
    ],
    skills: [{ id: 1, name: 'HACCP' }, { id: 2, name: 'ISO 22000' }, { id: 3, name: 'BRC Global Standards' }, { id: 4, name: 'التدقيق الداخلي' }],
    certifications: [
      { id: 1, name: 'Lead Auditor ISO 22000:2018', issuingBody: 'SGS', date: '2019' },
      { id: 2, name: 'Advanced HACCP Certification', issuingBody: 'NSF International', date: '2017' },
    ],
    stats: {
      profileViews: 128,
      jobApplications: 12,
      articleEngagement: 123,
    }
  },
    {
    id: 2,
    name: 'علي المنصور',
    avatarUrl: 'https://picsum.photos/seed/ali/200',
    headline: 'استشاري تشريعات غذائية وامتثال',
    location: 'دبي, الإمارات العربية المتحدة',
    email: 'ali.mansour@example.com',
    phone: '+971501234567',
    password: 'password123',
    role: 'user',
    about: 'خبير في اللوائح والتشريعات الغذائية الخليجية والدولية. أقدم استشارات للشركات لضمان توافق منتجاتهم مع متطلبات هيئات الغذاء والدواء. لدي خبرة واسعة في التعامل مع تحديات الاستيراد والتصدير.',
    experience: [
      { id: 3, title: 'استشاري أول', company: 'Food Law Consulting', duration: '2020 - حتى الآن', description: 'مساعدة العملاء على التنقل في المشهد التنظيمي المعقد للأغذية.' },
      { id: 4, title: 'أخصائي شؤون تنظيمية', company: 'مجموعة أغذية', duration: '2016 - 2020', description: 'ضمان امتثال جميع المنتجات الجديدة والحالية للتشريعات المحلية.' },
    ],
    education: [
      { id: 3, degree: 'بكالوريوس في القانون', school: 'جامعة الإمارات العربية المتحدة', duration: '2011 - 2015' },
    ],
    skills: [{ id: 5, name: 'تشريعات SFDA' }, { id: 6, name: 'CODEX Alimentarius' }, { id: 7, name: 'وضع العلامات الغذائية' }, { id: 8, name: 'تقييم المخاطر' }],
    certifications: [
      { id: 3, name: 'Certified Food Scientist (CFS)', issuingBody: 'IFT', date: '2021' },
    ],
    stats: {
      profileViews: 95,
      jobApplications: 5,
      articleEngagement: 38,
    }
  },
  {
    id: 3,
    name: 'سارة الخليوي',
    avatarUrl: 'https://picsum.photos/seed/sara/200',
    headline: 'مهندسة جودة أغذية',
    location: 'الدمام, المملكة العربية السعودية',
    email: 'sara.khalawi@example.com',
    phone: '+966551234567',
    password: 'password123',
    role: 'user',
    about: 'مهندسة جودة متخصصة في صناعة الألبان، مع خبرة في تحسين العمليات وضمان الامتثال لمعايير سلامة الغذاء.',
    experience: [],
    education: [{ id: 4, degree: 'بكالوريوس في هندسة الأغذية', school: 'جامعة الملك فيصل', duration: '2014 - 2018' }],
    skills: [{ id: 9, name: 'تحليل الألبان' }, { id: 10, name: 'GMP' }, { id: 11, name: 'إدارة الجودة الشاملة (TQM)' }],
    certifications: [],
    stats: {
      profileViews: 54,
      jobApplications: 3,
      articleEngagement: 19,
    }
  },
  {
    id: 4,
    name: 'محمد المصري',
    avatarUrl: 'https://picsum.photos/seed/mohammed/200',
    headline: 'مدرب واستشاري سلامة غذاء',
    location: 'القاهرة, مصر',
    email: 'mohamed.masri@example.com',
    phone: '+201001234567',
    password: 'password123',
    role: 'user',
    about: 'أقدم دورات تدريبية معتمدة في مجال سلامة الغذاء للشركات والأفراد، مع التركيز على بناء ثقافة السلامة الغذائية داخل المنظمات.',
    experience: [{ id: 5, title: 'مدرب مستقل', company: 'Food Safety Training Co.', duration: '2017 - حتى الآن', description: 'تقديم دورات تدريبية في HACCP و ISO 22000.' }],
    education: [],
    skills: [{ id: 12, name: 'تدريب الموظفين' }, { id: 13, name: 'HACCP' }, { id: 14, name: 'ServeSafe' }],
    certifications: [{ id: 4, name: 'Certified ServSafe Instructor', issuingBody: 'National Restaurant Association', date: '2018' }],
    stats: {
      profileViews: 88,
      jobApplications: 1,
      articleEngagement: 65,
    }
  },
  {
    id: 5,
    name: 'عمرو عثمان',
    avatarUrl: 'https://picsum.photos/seed/amrosman/200',
    headline: 'مستخدم جديد',
    location: 'مصر',
    email: 'amrosman57357@gmail.com',
    phone: '+201112345678',
    password: 'password123',
    role: 'user',
    about: 'مستخدم جديد انضم للمنصة.',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    stats: {
      profileViews: 0,
      jobApplications: 0,
      articleEngagement: 0,
    }
  },
   {
    id: 6,
    name: 'خالد الغامدي',
    avatarUrl: 'https://picsum.photos/seed/khalid/200',
    headline: 'مدير التوظيف',
    location: 'جدة, المملكة العربية السعودية',
    email: 'khalid.admin@example.com',
    phone: '+966555555555',
    password: 'jobspassword',
    role: 'admin',
    permissions: ['manage_jobs'],
    about: 'مسؤول التوظيف في المنصة، متخصص في ربط أصحاب العمل بالكفاءات المناسبة في قطاع سلامة الغذاء.',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    stats: {
      profileViews: 10,
      jobApplications: 0,
      articleEngagement: 5,
    }
  },
];

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'أخصائي جودة وسلامة أغذية',
    company: 'شركة الأغذية المتحدة',
    location: 'جدة, السعودية',
    type: 'دوام كامل',
    description: 'مطلوب أخصائي جودة للانضمام إلى فريقنا. يجب أن يكون لديه خبرة في تطبيق أنظمة HACCP و ISO 22000. المسؤوليات تشمل إجراء عمليات التفتيش الدورية، ومتابعة سجلات الجودة، وتدريب الموظفين على ممارسات النظافة الجيدة. يجب أن يكون حاصلاً على شهادة في علوم الأغذية أو مجال ذي صلة.',
    postedDate: '2024-07-20',
    logoUrl: 'https://picsum.photos/seed/companyA/100',
    contactEmail: 'hr@unitedfoods.com',
  },
  {
    id: 2,
    title: 'مدير ضمان الجودة',
    company: 'حلويات وطنية',
    location: 'الكويت',
    type: 'دوام كامل',
    description: 'قيادة قسم ضمان الجودة، تطوير الاستراتيجيات، وإدارة فريق من المفتشين والمحللين. يشترط خبرة لا تقل عن 5 سنوات في منصب إداري في قطاع الحلويات والمخبوزات.',
    postedDate: '2024-07-17',
    logoUrl: 'https://picsum.photos/seed/companyB/100',
    contactEmail: 'careers@watani-sweets.kw',
  },
  {
    id: 3,
    title: 'مفتش صحة وسلامة أغذية',
    company: 'بلدية دبي',
    location: 'دبي, الإمارات',
    type: 'عقد',
    description: 'إجراء عمليات تفتيش منتظمة على المنشآت الغذائية للتأكد من التزامها باللوائح الصحية. سيقوم المفتش بإعداد تقارير مفصلة ورفع التوصيات اللازمة.',
    postedDate: '2024-07-15',
    logoUrl: 'https://picsum.photos/seed/companyC/100',
    contactEmail: 'recruitment@dm.gov.ae',
  },
    {
    id: 4,
    title: 'منسق الشؤون التنظيمية',
    company: 'Global Food Importers',
    location: 'المنامة, البحرين',
    type: 'دوام جزئي',
    description: 'متابعة تحديثات التشريعات الغذائية وإعداد ملفات التسجيل للمنتجات الجديدة. هذا الدور مناسب لمن لديه معرفة جيدة بلوائح هيئة الغذاء والدواء.',
    postedDate: '2024-07-12',
    logoUrl: 'https://picsum.photos/seed/companyD/100',
    contactEmail: 'info@gfi.bh',
  },
];

const userToCommentUser = (user: User): CommentUser => ({
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
});

export const mockComments: { [key: string]: Comment[] } = {
    'article1': [
        { id: 1, user: userToCommentUser(mockUsers[1]), text: 'مقال رائع ومفيد جداً! شكراً على مشاركة هذه المعلومات القيمة.', timestamp: 'منذ ساعتين' },
        { id: 2, user: userToCommentUser(mockUsers[2]), text: 'نقطة مهمة جداً، خاصة للمطاعم الناشئة.', timestamp: 'منذ ساعة' },
    ],
    'article2': [
        { id: 3, user: userToCommentUser(mockUsers[0]), text: 'هذه التحديثات ستؤثر بشكل كبير على المستوردين. يجب الانتباه لها.', timestamp: 'منذ 5 ساعات' },
    ],
    'article3': [
        { id: 4, user: userToCommentUser(mockUsers[3]), text: 'أضيف على ذلك أهمية الفصل بين ألواح التقطيع للحوم النيئة والمطبوخة.', timestamp: 'منذ يوم' },
        { id: 5, user: userToCommentUser(mockUsers[0]), text: 'بالتأكيد، الوقاية خير من العلاج. شكراً للإضافة.', timestamp: 'منذ 20 ساعة' },
        { id: 6, user: userToCommentUser(mockUsers[1]), text: 'معلومات ممتازة.', timestamp: 'منذ 15 ساعة' },
    ]
};


export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'أهمية تطبيق نظام HACCP في المطاعم',
    author: mockUsers[0],
    category: 'الممارسات الصحية',
    excerpt: 'يعد نظام تحليل المخاطر ونقاط التحكم الحرجة (HACCP) حجر الزاوية في أي برنامج فعال لسلامة الأغذية...',
    content: 'تفاصيل المقال الكاملة هنا...',
    publishedDate: '15 يوليو 2024',
    imageUrl: 'https://picsum.photos/seed/article1/400/250',
    comments: mockComments['article1'],
    likes: 45,
  },
  {
    id: 2,
    title: 'آخر تحديثات تشريعات الملصق الغذائي في دول الخليج',
    author: mockUsers[1],
    category: 'التشريعات',
    excerpt: 'أصدرت الهيئات التنظيمية في دول مجلس التعاون الخليجي مؤخراً تحديثات هامة تتعلق بمتطلبات الملصق الغذائي...',
    content: 'تفاصيل المقال الكاملة هنا...',
    publishedDate: '12 يوليو 2024',
    imageUrl: 'https://picsum.photos/seed/article2/400/250',
    comments: mockComments['article2'],
    likes: 30,
  },
    {
    id: 3,
    title: 'كيفية الوقاية من تلوث السالمونيلا في الدواجن',
    author: mockUsers[0],
    category: 'تلوث الغذاء',
    excerpt: 'تعتبر السالمونيلا من أخطر أنواع البكتيريا التي يمكن أن تلوث منتجات الدواجن. يتناول هذا المقال خطوات عملية للوقاية منها...',
    content: 'تفاصيل المقال الكاملة هنا...',
    publishedDate: '10 يوليو 2024',
    imageUrl: 'https://picsum.photos/seed/article3/400/250',
    comments: mockComments['article3'],
    likes: 78,
  },
];